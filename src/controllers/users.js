import { request, response } from 'express';
import { getAll, newUser, login } from '../services/user.js';

export const getAllUsers = async (req = request, res = response, next) => {
  try {
    const users = await getAll();

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req = request, res = response, next) => {
  const { userName, password } = req.body;

  try {
    const user = await newUser(userName, password);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req = request, res = response, next) => {
  const { userName, password } = req.body;

  try {
    const token = await login(userName, password);
    // console.log(token);

    res.json({
      msg: 'Login successfull',
      token,
    });
  } catch (error) {
    next(error);
  }
};