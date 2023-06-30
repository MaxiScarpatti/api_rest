import express from 'express';
import routesUsers from '../routes/user.routes.js';
import routesLibrary from '../routes/library.routes.js';
import routesBook from '../routes/book.routes.js';
import db from '../database/database.js';
import './Library.js';
import './Book.js';
import errorHandlerMiddleware from '../middlewares/error-handler.js';
import initAuth from '../auth/auth.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoute = '/user';
    this.libraryRoute = '/library';
    this.booksRoute = '/book';
    this.auth = initAuth();

    // Db connection
    this.dbConection();

    // middleware
    this.middleware();

    // routes
    this.routes();

    // Error handler
    this.app.use(errorHandlerMiddleware);
  }

  async dbConection() {
    try {
      await db.sync();
      // to drop all the tables and create again
      // await db.sync({ force: true });
      // await db.authenticate();
      console.log('Connection has been established successfully');
    } catch (error) {
      console.error('Unable to connect to the database');
    }
  }

  middleware() {
    // Passport - JWT

    // public directory
    this.app.use(express.static('public'));

    // JSON - lectura y parseado del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersRoute, routesUsers);
    this.app.use(this.libraryRoute, routesLibrary);
    this.app.use(this.booksRoute, routesBook);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening from port ${this.port}`);
    });
  }
}

export default Server;