import {MongoClient} from 'mongodb';

let db;

async function connectToMongoDB() {

  /*
  MongoClient.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/', (err, client) => {
    // Client returned
    var db = client.db('test');
  }); */

  // ---- Este codigo es del tutorial MERN, borrar despues
/*
  const URI = 'mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/';
  const client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  console.log('db file')

  try {

console.log('primera linea try config.js')

    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("test");
  } catch (err) {
    console.error(err);
  }

  let db = client.db("test");
*/




    try {
        const client = await MongoClient.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/');
        db = client.db('test');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}





 
export { db, connectToMongoDB};



