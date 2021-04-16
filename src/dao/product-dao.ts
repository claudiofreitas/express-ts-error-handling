import Product from '../entities/product';

export default class ProductDao {
  public static getById(id: string): Product | undefined {
    console.log('ProductDao.getById()');
    console.log('Fetching the database... (fake)');
    if (id === '3') {
      console.log('Simulating a not found product when requested id is 3.');
      return undefined;
    } else {
      console.log('Returning a fake product.');
      return new Product(id, 'Mewtsubish');
    }
  }

  public static save(product: Product) {
    console.log('ProductDao.save()');
    console.log('Saving to the database...');
    // Return the new saved product
  }
}
