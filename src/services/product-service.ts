import ProductDao from '../dao/product-dao';
import HttpError from '../errors/http-error';
import { HttpStatusCode } from '../enums/http-status-code';
import HttpSuccessResponse from '../types/http-success-response';
import { ValidationError } from '../types/validation-error';
import Product from '../entities/product';

export default class ProductService {
  public static async getById(id: string): Promise<HttpSuccessResponse> {
    console.log('ProductService.getById()');
    const product = await ProductDao.getById(id);
    if (!product) {
      const errorBody = {
        status: 'error',
        message: 'Product not found.',
      };
      throw new HttpError(HttpStatusCode.NOT_FOUND, errorBody);
    }

    const successBody = {
      result: {
        product,
      },
    };
    const response = new HttpSuccessResponse(HttpStatusCode.OK, successBody);
    return response;
  }

  public static async putById(id: string, payload: unknown) {
    console.log('ProductService.putById()');

    // Syntactic Validations
    const validationErrors = ProductService.validatePutByIdPayload(payload);
    if (validationErrors.length > 0) {
      const httpValidationErrorBody = {
        status: 'error',
        message: 'Validation error',
        errors: validationErrors,
      };
      throw new HttpError(HttpStatusCode.BAD_REQUEST, httpValidationErrorBody);
    }

    // Check the product exists
    const product = await ProductDao.getById(id);
    if (!product) {
      const notFoundErrorBody = {
        status: 'error',
        message: 'Product not found.',
      };
      throw new HttpError(HttpStatusCode.NOT_FOUND, notFoundErrorBody);
    }

    // Check the modification is allowed
    if (!ProductService.canTheProductBeModified(product)) {
      const notModifiableErrorBody = {
        status: 'error',
        message:
          'The current product is under maintenance and can not be modified at this moment.',
      };
      throw new HttpError(HttpStatusCode.CONFLICT, notModifiableErrorBody);
    }

    // Save the modification
    // @ts-ignore
    product.name = payload.name;
    const newProduct = await ProductDao.save(product);

    // Return the saved product
    return new HttpSuccessResponse(HttpStatusCode.OK, {
      result: {
        // @ts-ignore
        ...newProduct,
      },
    });
  }

  private static validatePutByIdPayload(payload: unknown): ValidationError[] {
    console.log('ProductService.validatePutByIdPayload()');
    // Some logic here to check that each field in the payload is valid, etc
    return [];
  }

  private static canTheProductBeModified(product: Product): boolean {
    console.log('ProductService.canTheProductBeModified()');
    /*
     Check if the change is allowed.
     Perhaps the product is linked with some other entity
     and the link can not be undone at the moment, or any other reason
    */
    return true;
  }
}
