import { Router } from 'express';

export default abstract class AbstractController {
  public abstract path: string;
  public abstract router: Router;
}
