import { Router } from "express";
const router = Router();
export default router; //Export the router instance


/* Funcion para añadir producto de forma local */

import { LocalProduct } from '../controllers/localProduct.js'; 

router.post('/productoLocal', LocalProduct);

/* Funcion para hacer un constante display de todos los productos almacenados */

import { getAllProducts } from '../controllers/displayAllProducts.js'; 

router.get('/inventario', getAllProducts);

/* Funcion para ordenar productos de precio menor a mayor */

import { minPrice } from '../controllers/minPrice.js';

router.get('/minPrice' , minPrice);

/* Funcion para ordenar productos de precio mayor a menor */

import { maxPrice } from '../controllers/maxPrice.js';

router.get('/maxPrice', maxPrice);

/* Funcion para ordenar productos de cantidad mayor a menor */

import { maxQuantity } from '../controllers/maxQuantity.js';

router.get('/maxQuantity', maxQuantity);

/* Funcion para ordenar productos de cantidad menor a mayor */

import { minQuantity } from '../controllers/minQuantity.js';

router.get('/minQuantity', minQuantity);

/* Funcion para buscar productos por su nombre */

import { searchbar } from '../controllers/searchbar.js';

router.get('/search', searchbar);