/* Aqui estara el archivo principal del servidor. Este archivo se correra cada vez que se levante el back-end */

// Imports
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {ConnectDB} = require('./database/config')

// Creacion del server de express

const app = express();

const PORT = process.env.PORT || 3000; //Usar puerto default 3000, si esta no esta habilitado, usar otro libre
app.set('json spaces', 2);

const server = http.createServer(app) //Crear server

// Middlewares

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); // ver si esto es compatible o no
app.use(express.json());

// Esto es para los limites de tomaño de las imagenes enviadas al backend
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes

app.use('/api/products', require ('./routes/products')); 

// Muestra donde el server esta corriendo

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await ConnectDB();
}); 