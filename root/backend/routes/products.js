const express = require("express");
const router = express.Router();
module.exports = router; //Export the router instance

/* Funcion para añadir producto de forma local */

const { LocalProduct } = require('../controllers/localProduct') 

router.post('/productoLocal', LocalProduct);

/* */