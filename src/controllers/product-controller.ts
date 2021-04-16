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
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = request.params.id;
      const serviceResult = await ProductService.getById(id);
      response.status(serviceResult.statusCode).send(serviceResult.body);
    } catch (error) {
      next(error);
    }
  }

  private static async putById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = request.params.id;
      const payload = request.body;
      const serviceResult = await ProductService.putById(id, payload);
      response.status(serviceResult.statusCode).send(serviceResult.body);
    } catch (error) {
      next(error);
    }
  }
}
