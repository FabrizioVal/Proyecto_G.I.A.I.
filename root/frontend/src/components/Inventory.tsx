import { useState, useEffect } from 'react';
import ProductContainer from './ProductContainer';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from backend API
    axios.get('http://localhost:3000/api/products/inventario')
      .then(response => {
        // Access the data property of the AxiosResponse object
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {products.map(product => (
        <ProductContainer
          imageUrl={product.imageUrl} // Assuming product.imageUrl contains the image URL
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
    </div>
  );
}

export default Inventory;
