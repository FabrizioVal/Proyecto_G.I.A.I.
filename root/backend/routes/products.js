import { Router } from "express";
const router = Router();
export default router; //Export the router instance


/* Funcion para añadir producto de forma local */

import { LocalProduct } from '../controllers/localProduct.js'; 

router.post('/productoLocal', LocalProduct);

/* Funcion para hacer un constante display de todos los productos almacenados */

import { getAllProducts } from '../controllers/displayAllProducts.js'; 

router.get('/inventario', getAllProducts);