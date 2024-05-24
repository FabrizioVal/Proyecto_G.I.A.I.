/*

// Import the MongoDB client
const MongoClient = require('mongodb').MongoClient;

// Retrieve MongoDB Atlas connection string from your config file
const { mongoURI } = require('../database/config'); // Assuming config file is in the same directory

const getAllProducts = (req, res) => {

  MongoClient.connect(mongoURI, function(err, db) {
    if (err) {
      // If an error occurs while connecting, send a 500 Internal Server Error response
      console.error("Error connecting to the database:", err);
      return res.status(500).send("An error occurred while connecting to the database.");
    }

    var dbo = db.db("GIAIWeb");
    
    //Find all documents in the customers collection:
    dbo.collection().find({}).toArray(function(err, result) {
      if (err) {
        // If an error occurs while fetching products, send a 500 Internal Server Error response
        console.error("Error fetching products:", err);
        return res.status(500).send("An error occurred while fetching products.");
      }
      
      console.log("Products:", result);
      
      

      // Send a JSON response with the products array and then close db
      res.json(result);
      db.close();
    });
  });
};

module.exports = {
  getAllProducts,
};

*/

// Import the MongoDB client
//const MongoClient = require('mongodb').MongoClient;

// Retrieve MongoDB Atlas connection string from your config file
//const { url } = require('../database/config'); // Assuming config file is in the same directory
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
  