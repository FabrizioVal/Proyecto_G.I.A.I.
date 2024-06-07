// Inventory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContainer from './ProductContainer'; // estructura frotend del schema
import { Product } from '../../../backend/models/product.ts'; // modelo de producto

interface InventoryProps {
  searchQuery: string;
  sortFunction?: (products: Product[]) => Product[];
}

const Inventory: React.FC<InventoryProps> = ({ searchQuery, sortFunction }) => {
  const [products, setProducts] = useState<Product[]>([]);
    
  async  function test(){
    try {
      const response = await fetch("http://localhost:3000/api/products/inventario");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data)
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    
  }
  useEffect(() => {

    test()
    // Fetch product data from backend API
    axios.get('http://localhost:3000/api/products/inventario')
      .then(response => {
        console.log(response.data)
        setProducts(response.data);
      })
      .catch(error => {
        console.error("error")
        console.error('Error fetching product data:', error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
console.log(products)

const sortedProducts = sortFunction ? sortFunction(filteredProducts) : filteredProducts;

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {sortedProducts.map(product => (
        <ProductContainer
          key={product._id}
          _id={product._id}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
    </div>
  );
};

export default Inventory;
