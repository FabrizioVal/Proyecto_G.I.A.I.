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

export const getAllProducts = async (req, res) => {
    
   
        try {
          
          // Access the "records" collection and retrieve documents
          const collection = db.collection("records");
          const results = await collection.find({}).toArray();
          
          // Send the results as a response
          res.send(results).status(200);
        } catch (error) {
          // Handle errors
          console.error("Error fetching records:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }

    
      
}

  export default getAllProducts
  