import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct): Promise<TProduct> => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (): Promise<TProduct[]> => {
  const result = await Product.find();
  return result;
};

const getProductByIdFromDB = async (id: string): Promise<TProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (
  id: string,
  product: TProduct,
): Promise<TProduct | null> => {
  const result = await Product.findByIdAndUpdate(id, product, { new: true });
  return result;
};
const deleteProductFromDB = async (id: string): Promise<TProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
