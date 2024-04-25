/* Aqui estara el archivo principal del servidor. Este archivo se correra cada vez que se levante el back-end */

// Imports

import { createServer } from 'http';
import express, { urlencoded as _urlencoded, json as _json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {connectToMongoDB} from './database/config.js';



// Creacion del server de express

const app = express();

const PORT = process.env.PORT || 3000; //Usar puerto default 3000, si esta no esta habilitado, usar otro libre
app.set('json spaces', 2);

const server = createServer(app) //Crear server

// Middlewares

app.use(cors());
app.use(morgan('dev'));
app.use(_urlencoded({extended:false})); // ver si esto es compatible o no
app.use(_json());

// Esto es para los limites de tomaño de las imagenes enviadas al backend (TODAVIA NO FUNCIONA)
app.use(_json({ limit: '50mb' }));
app.use(_urlencoded({ limit: '50mb', extended: true }));

// Routes

import productsRouter from './routes/products.js';

app.use('/api/products', productsRouter);


// Muestra donde el server esta corriendo

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
 await connectToMongoDB();
}); 