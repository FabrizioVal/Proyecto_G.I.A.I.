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

const getAllProducts = (req, res) => {
    console.log('I am in the first line of getAllProducts!!');
  
    try {
      var MongoClient = require('mongodb').MongoClient;
      var { mongoURI } = require('../database/config');
  
      console.log('mongoURI:', mongoURI);
      console.log('Attempting to connect to MongoDB...');


      MongoClient.connect(mongoURI, function(err, db) { 

        console.log("inside first mongoconnect line")
        
        if (err) {
          console.error('Failed to connect to MongoDB:', err);
          res.status(500).json({ error: 'Failed to connect to MongoDB' });
          return;
        }
  
        console.log('Connected to MongoDB successfully!');
  
        var db = db.db('test');
        console.log('Database object:', dbo);
        console.log('Database connection:', db);
  
        //Find all documents in the customers collection:
        dbo.collection("products").find({}).toArray(function(err, result) {
          if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Error fetching products' });
            return;
          }
          console.log('Products:', result);
          res.json(result);
          
        });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getAllProducts,
  };
  