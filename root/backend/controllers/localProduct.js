import product from '../models/product.js';
import { db } from '../database/config.js';

export const LocalProduct = async (req, res) => {
  const { productName, productPrice, productQuantity, file } = req.body;

  try {
    if (!db) {
      throw new Error('Database connection not established');
    }

    const newProduct = new product({ name: productName, quantity: productQuantity, price: productPrice, imageUrl: file });
    await newProduct.save();
    console.log('Producto añadido');
    res.status(200).send({ message: 'Producto añadido exitosamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'No se ha podido añadir el producto' });
  }
}

export default { LocalProduct };
