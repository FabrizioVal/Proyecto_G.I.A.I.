const express = require("express");
const router = express.Router();
module.exports = router; //Export the router instance

/* Funcion para añadir producto de forma local */

const { LocalProduct } = require('../controllers/localProduct') 

router.post('/productoLocal', LocalProduct);

/* Funcion para hacer un constante display de todos los productos almacenados */

const { getAllProducts } = require('../controllers/displayAllProducts') 

router.get('/inventario', getAllProducts);