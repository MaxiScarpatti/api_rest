import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getAll = async () => {
  const userList = await User.findAll({
    where: {
      isActive: 1,
    },
  });

  if (userList.length < 1) {
    throw new Error(`There are no active users on the database`);
  }

  return userList;
};

export const newUser = async (userName, password) => {
  const checkUser = await User.findOne({
    where: {
      userName: userName,
    },
  });
  if (checkUser) {
    throw new Error(`There's already a user with the name ${userName}`);
  }

  const newUser = await User.create({
    userName: userName,
    password: password,
    isActive: true,
  });

  return newUser;
};

export const login = async (userName, password) => {
  const loggedInUser = await User.findOne({
    where: {
      userName: userName,
      password: password,
    },
  });

  if (!loggedInUser) {
    throw new Error('Email or password incorrect');
  }

  const token = jwt.sign(
    {
      id: loggedInUser.id,
      user: loggedInUser.user,
      // name: loggedInUser.email,
    },
    process.env.JWT_PASSWORD
  );

  return {
    accessToken: token,
  };
};