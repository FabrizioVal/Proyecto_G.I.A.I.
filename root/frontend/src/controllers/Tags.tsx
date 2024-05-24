/* Funciones de etiquetas */

import { Product } from '../../../backend/models/product.ts'; // Adjust the path as needed

export const handleQuantityAsc = (products: Product[]) => {
  return products.sort((a, b) => a.quantity - b.quantity);
};

export const handleQuantityDesc = (products: Product[]) => {
  return products.sort((a, b) => b.quantity - a.quantity);
};

export const handlePriceAsc = (products: Product[]) => {
  return products.sort((a, b) => a.price - b.price);
};

export const handlePriceDesc = (products: Product[]) => {
  return products.sort((a, b) => b.price - a.price);
};
