// Inventory.tsx
// Inventory.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContainer from './ProductContainer';
import { Product } from '../../../backend/models/product.ts';
import EditProduct from '../controllers/EditProduct';
import AddProduct from '../controllers/LocalProduct';

interface InventoryProps {
  searchQuery: string;
  sortFunction?: (products: Product[]) => Product[];
}

const Inventory: React.FC<InventoryProps> = ({ searchQuery, sortFunction }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State for add product dialog

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/inventario');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

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

  const handleAddProduct = () => {
    setAddDialogOpen(true); // Open the add product dialog
  };

  const handleProductAdd = () => {
    setAddDialogOpen(false); // Close the add product dialog
    fetchProducts(); // Refresh inventory after adding a product
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/eliminarProducto/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
            onDeleteClick={() => handleDeleteProduct(product._id)}
          />
        </div>
      ))}

      <AddProduct
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onProductAdd={handleProductAdd}
      />

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
