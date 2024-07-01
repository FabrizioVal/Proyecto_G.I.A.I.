import {db} from '../database/config.js';


export const getAllProducts = async (req, res) => {
    
   
        try {
        if (!db) {
            throw new Error('Database connection not established');
        }
        let collection = db.collection("products");
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
    }
};

  export default getAllProducts
  