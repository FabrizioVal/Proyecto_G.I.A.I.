// Inventory.tsx
// Inventory.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContainer from './ProductContainer'; // estructura frotend del schema
import { Product } from '../../../backend/models/product.ts'; // modelo de producto
import EditProduct from '../controllers/EditProduct.tsx';


interface InventoryProps {
  searchQuery: string;
  sortFunction?: (products: Product[]) => Product[];
}

const Inventory: React.FC<InventoryProps> = ({ searchQuery, sortFunction }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/inventario');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = sortFunction ? sortFunction(filteredProducts) : filteredProducts;

  return (
    <div className="flex flex-wrap justify-center mt-10 mb-10">
      {sortedProducts.map(product => (
        <div key={product._id}>
          <ProductContainer
            _id={product._id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            onEditClick={() => handleEditClick(product)}
          />
        </div>
      ))}
      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onProductUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default Inventory;
