
// Define a schema and model

import {Schema, model} from 'mongoose';

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

export default model('Product', ProductSchema) 