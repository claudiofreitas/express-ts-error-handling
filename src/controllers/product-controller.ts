import { NextFunction, Request, Response, Router } from 'express';
import ProductService from '../services/product-service';
import AbstractController from './abstract-controller';

export default class ProductController extends AbstractController {
  public path = '/products';
  public router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, ProductController.getById);
    this.router.put(`${this.path}/:id`, ProductController.putById);
  }

  private static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log('ProductController.getById()');
    try {
      const id = req.params.id;
      const httpResponse = await ProductService.getById(id);
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error) {
      next(error);
    }
  }

  private static async putById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log('ProductController.putById()');
    try {
      const id = req.params.id;
      const payload = req.body;
      const httpResponse = await ProductService.putById(id, payload);
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error) {
      next(error);
    }
  }
}
