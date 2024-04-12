
// Define a schema and model

const { Schema, model } = require("mongoose");

//LockReport model

const ProductSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
   cantidad: {
    type: Number,
    required: true,
  },
   precio: {
    type: Number,
    required: true,
   },
});

//Models exportation

module.exports = model('Producto', ProductSchema) 