import ProductDao from '../dao/product-dao';
import Product from '../entities/product';
import { ValidationError } from '../types/validation-error';

export default class ProductService {
  public static async getById(id: string): Promise<unknown> {
    console.log('ProductService.getById()');
    const product = await ProductDao.getById(id);
    if (!product) {
      const notFoundResult = {
        statusCode: 404,
        result: {
          status: 'error',
          message: 'Product not found.',
        },
      };
      return notFoundResult;
    }

    const successResult = {
      statusCode: 200,
      result: {
        status: 'ok',
        result: {
          product,
        },
      },
    };
    return successResult;
  }

  public static async putById(id: string, payload: unknown) {
    console.log('ProductService.putById()');

    // Syntactic Validations
    const validationErrors = ProductService.validatePutByIdPayload(payload);
    if (validationErrors.length > 0) {
      const validationErrorResponse = {
        statusCode: 400,
        result: {
          status: 'error',
          message: 'Validation error',
          errors: validationErrors,
        },
      };
      return validationErrorResponse;
    }

    // Check the product exists
    const product = await ProductDao.getById(id);
    if (!product) {
      const notFoundErrorResponse = {
        statusCode: 400,
        result: {
          status: 'error',
          message: 'Product not found.',
        },
      };
      return notFoundErrorResponse;
    }

    // Semantic Validation: Check the modification is allowed
    if (!ProductService.validateTheProductBeModified(product)) {
      const notModifiableErrorResponse = {
        statusCode: 409,
        result: {
          status: 'error',
          message:
            'The current product is under maintenance (or whatever reason) and can not be modified at this moment.',
        },
      };
      return notModifiableErrorResponse;
    }

    // Save the modification
    // @ts-ignore
    product.name = payload.name;
    const newProduct = await ProductDao.save(product);

    // Return the saved product
    const successResponse = {
      statusCode: 200,
      result: {
        status: 'ok',
        product: newProduct,
      },
    };
    return successResponse;
  }

  private static validatePutByIdPayload(payload: unknown): ValidationError[] {
    console.log('ProductService.validatePutByIdPayload()');
    // Some logic here to check that each field in the payload is valid, etc
    return [];
  }

  private static validateTheProductBeModified(product: Product): boolean {
    console.log('ProductService.validateTheProductBeModified()');
    /*
     Check if the change is allowed.
     Perhaps the product is linked with some other entity
     and the link can not be undone at the moment, or any other reason
    */
    return true;
  }
}
