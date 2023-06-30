import { BOOLEAN, DataTypes } from 'sequelize';
import db from '../db/db.js';

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

export default User;