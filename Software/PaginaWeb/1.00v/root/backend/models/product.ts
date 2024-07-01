
// Define a schema and model

import { Schema, model, Document } from 'mongoose';

// Define the Product interface that extends Mongoose's Document interface
export interface Product extends Document {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

// Define the Product schema
const ProductSchema = new Schema<Product>({
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

// Export the Product model
export default model<Product>('Product', ProductSchema);
