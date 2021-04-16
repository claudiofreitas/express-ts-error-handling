import { Request, Response, Router } from 'express';
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

  private static async getById(req: Request, res: Response): Promise<void> {
    console.log('ProductController.getById()');
    try {
      const id = req.params.id;
      const serviceResult = await ProductService.getById(id);
      // @ts-ignore
      res.status(serviceResult.statusCode).send(serviceResult.result);
    } catch (error) {
      console.log('Log error: ', error);
      res.status(500).send('Internal server error.');
    }
  }

  private static async putById(req: Request, res: Response): Promise<void> {
    console.log('ProductController.putById()');
    try {
      const id = req.params.id;
      const payload = req.body;
      const serviceResult = await ProductService.putById(id, payload);
      res.status(serviceResult.statusCode).send(serviceResult.result);
    } catch (error) {
      console.log('Log error: ', error);
      res.status(500).send('Internal server error.');
    }
  }
}
