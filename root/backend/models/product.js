
// Define a schema and model

const { Schema, model } = require("mongoose");

//LockReport model

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },
   quantity: {
    type: Number,
    required: true,
  },
   price: {
    type: Number,
    required: true,
   },
   imageUrl: {
    type: String,
    required: true,
  },
   
});

//Models exportation

module.exports = model('Product', ProductSchema) 