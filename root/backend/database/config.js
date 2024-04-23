const { MongoClient, ServerApiVersion } = require ('mongodb');

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
    return client.db("employees");
  } catch (err) {
    console.error(err);
  }


let db = client.db("test");

export default db;

