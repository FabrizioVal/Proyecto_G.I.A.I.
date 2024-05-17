// Inventory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContainer from './ProductContainer';

interface InventoryProps {
  searchQuery: string;
}

const Inventory: React.FC<InventoryProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch product data from backend API
    axios.get('http://localhost:3000/api/products/inventario')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {filteredProducts.map(product => (
        <ProductContainer
          key={product.id}
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
