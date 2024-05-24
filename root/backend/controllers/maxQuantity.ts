import { db } from '../database/config.js';

export const maxQuantity = async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Get the "products" collection
    const collection = db.collection('products');

    // Query the database and sort by price from big to small
    const results = await collection.find({}).sort({ quantity: -1 }).toArray();

    res.send(results).status(200);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
  }
};

export default maxQuantity;

