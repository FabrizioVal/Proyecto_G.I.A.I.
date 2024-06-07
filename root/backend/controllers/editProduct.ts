import Product from '../models/product.ts';
import { db } from '../database/config.js';

export const editProduct = async (req, res) => {
    const { productName, productPrice, productQuantity, file, _id } = req.body;
  
    try {
        if (!db) {
            throw new Error('Database connection not established');
          }

      const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        {
          name: productName,
          price: productPrice,
          quantity: productQuantity,
          imageUrl: file,
        },
        { new: true }
      );
  
console.log(productName, productPrice, productQuantity, _id);

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  };

export default editProduct