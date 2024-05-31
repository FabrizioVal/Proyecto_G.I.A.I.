import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { BsThreeDots } from 'react-icons/bs';
import { editProduct } from '../controllers/EditProduct.tsx';

const ProductContainer = ({ id, imageUrl, name, price, quantity }) => {
  const { dialog, setOpen, setProductData } = editProduct(); // Usar el hook para editar producto
  

  const handleEditClick = () => {
    setProductData({ id, name, price, quantity, imageUrl }); // Setear los datos del producto a editar
    setOpen(true);
  };

  return (
    <div className="max-w-xs p-6 relative group">
      <Card className="bg-gray-300">
        <CardHeader>
          <div className="relative justify-center flex w-full h-full">
            <img src={imageUrl} alt={name} />
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BsThreeDots className="text-gray-700 size-8" onClick={handleEditClick} />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <div className="mt-4 -mb-2">
            <h3 className="text-left font-bold mb-2">{name}</h3>
            <div className="flex">
              <p style={{ fontSize: '30px' }} className="mr-4 text-">${price}</p>
              <p className="mt-2 mb-2 mr-2">Quantity: {quantity}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
      {dialog}
    </div>
  );
};

export default ProductContainer;
