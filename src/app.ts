import express = require('express');
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ProductController from './controllers/product-controller';
import AbstractController from './controllers/abstract-controller';
import { internalErrorHandler } from './middlewares/internal-error-handler';
import { httpErrorHandler } from './middlewares/http-error-handler';

class App {
  private app: express.Application;
  private controllers: AbstractController[] = [new ProductController()];

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initControllers();
    this.initErrorHandlers();
  }

  private initMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  }

  private initControllers(): void {
    this.controllers.forEach((controller) => {
      this.app.use(controller.router);
    });
  }

  private initErrorHandlers(): void {
    this.app.use(httpErrorHandler);
    this.app.use(internalErrorHandler);
  }

  listen(): void {
    this.app.listen(3000, () => {
      console.log('  Listening at port 3000. http://localhost:3000');
    });
  }
}

(() => {
  const app = new App();
  app.listen();
})();
