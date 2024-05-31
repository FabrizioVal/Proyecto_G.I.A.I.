import { Router } from "express";
const router = Router();
export default router; //Export the router instance


/* Funcion para añadir producto de forma local */

import { LocalProduct } from '../controllers/localProduct.ts'; 

router.post('/productoLocal', LocalProduct);

/* Funcion para hacer un constante display de todos los productos almacenados */

import { getAllProducts } from '../controllers/displayAllProducts.ts'; 

router.get('/inventario', getAllProducts);

import { editProduct } from '../controllers/editProduct.ts'; 

router.put('/editarProducto/:id', editProduct);