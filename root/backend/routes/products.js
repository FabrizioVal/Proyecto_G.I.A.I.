import { Router } from "express";
const router = Router();
export default router; //Export the router instance
import {db} from '../database/config.js';

// -----
// El tema es el siguiente, el metodo de conexion que funciono para inventario tiene que ser usado para productoLocal
// Ahora mismo, si con postman intento añadir un producto, la funcion localproduct carece de una conexion a la base de datos
// -----

/* Funcion para añadir producto de forma local */

import { LocalProduct } from '../controllers/localProduct.js'; 

router.post('/productoLocal', LocalProduct);

/* Funcion para hacer un constante display de todos los productos almacenados */

//import { getAllProducts } from '../controllers/displayAllProducts.js'; 

//router.get('/inventario', getAllProducts);


/*
import { MongoClient } from "mongodb";

let db;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect('mongodb+srv://fabri:fabripassword@giaiweb.teni6je.mongodb.net/');
        db = client.db('test');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

connectToDatabase();
*/

//import { getAllProducts } from '../controllers/displayAllProducts.js'; 

//router.get('/inventario', getAllProducts);

router.get("/inventario", async (req, res) => {
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
});

