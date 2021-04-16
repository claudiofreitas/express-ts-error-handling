import ProductDao from '../dao/product-dao';
import HttpError from '../errors/http-error';
import { HttpStatusCode } from '../enums/http-status-code';
import HttpResponse from '../types/http-response';
import { ValidationError } from '../types/validation-error';
import Product from '../entities/product';

export default class ProductService {
  public static async getById(id: string): Promise<HttpResponse> {
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
    const response = new HttpResponse(HttpStatusCode.OK, successBody);
    return response;
  }

  public static async putById(id: string, payload: unknown) {
    console.log('ProductService.putById()');

    // Syntactic Validations
    ProductService.validatePutByIdPayload(payload);

    // Check the product exists
    const product = await ProductDao.getById(id);
    if (!product) {
      const notFoundErrorBody = {
        status: 'error',
        message: 'Product not found.',
      };
      throw new HttpError(HttpStatusCode.NOT_FOUND, notFoundErrorBody);
    }

    // Semantic Validation: Check the modification is allowed
    ProductService.validateTheProductBeModified(product)

    // Save the modification
    // @ts-ignore
    product.name = payload.name;
    const newProduct = await ProductDao.save(product);

    // Return the saved product
    return new HttpResponse(HttpStatusCode.OK, {
      result: {
        status: 'ok',
        product: newProduct,
      },
    });
  }

  private static validatePutByIdPayload(payload: unknown): void {
    console.log('ProductService.validatePutByIdPayload()');
    // Some logic here to check that each field in the payload is valid, etc

    // Suppose that instead of the line below receiving an empty array,
    // it will contain the result of all the validation errors found, like in the previous pseudo-implementation.
    const validationErrors: ValidationError[] = [];

    if (validationErrors.length > 0) {
      const httpValidationErrorBody = {
        status: 'error',
        message: 'Validation error',
        errors: validationErrors,
      };
      throw new HttpError(HttpStatusCode.BAD_REQUEST, httpValidationErrorBody);
    }
  }

  private static validateTheProductBeModified(product: Product): void {
    console.log('ProductService.validateTheProductBeModified()');
    /*
     Check if the change is allowed.
     Perhaps the product is linked with some other entity
     and the link can not be undone at the moment, or any other reason
    */

    // Suppose that instead of the line below receiving a fixed `true` value,
    // it will contain the result of all the validation errors found, like in the previous pseudo-implementation.
    const canTheProductBeModified = true;

    if (!canTheProductBeModified) {
      const notModifiableErrorBody = {
        status: 'error',
        message:
          'The current product is under maintenance and can not be modified at this moment.',
      };
      throw new HttpError(HttpStatusCode.CONFLICT, notModifiableErrorBody);
    }
  }
}
