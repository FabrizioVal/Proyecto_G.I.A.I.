import {MongoClient} from 'mongodb';
import {mongoose} from 'mongoose';

let db;

async function connectToMongoDB() {

    try {
        const client = await MongoClient.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/'); // toda funcion de mongo usa el parametro exportado "db"
        await mongoose.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/') // las funciones relacionadas a mongoose dependen de que esta string se conecte. Aplica globalmente, no paso variables de conexion
        db = client.db('test');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
 
export { db, connectToMongoDB};



