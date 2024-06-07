import Product from '../models/product.ts';
import { db } from '../database/config.js';

export const deleteProduct = async (req, res) => {
  const { _id } = req.body;

  try {
    if (!db) {
      throw new Error('Database connection not established');
    }

console.log(_id);

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

export default deleteProduct;
