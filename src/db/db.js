import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.MYSQL_DATABASE_NAME,
  process.env.MYSQL_DATABASE_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

export default db;