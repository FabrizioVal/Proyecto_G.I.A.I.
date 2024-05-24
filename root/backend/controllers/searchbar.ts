import { db } from '../database/config.js';

export const searchbar = async (req, res) => {
    
  try {
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    const query = req.query.query; // Retrieve the query parameter from the URL
    console.log(query);

    const collection = db.collection('products');

    const results = await collection.find({ name: { $regex: new RegExp(query, 'i') }}).sort({ quantity: 1 }).toArray();

    res.send(results).status(200);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
  }
}

export default searchbar