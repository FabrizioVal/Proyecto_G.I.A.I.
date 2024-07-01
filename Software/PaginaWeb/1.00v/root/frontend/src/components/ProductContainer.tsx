import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsTrash } from 'react-icons/bs';
import { useDeleteProduct } from '../controllers/EraseProduct';

interface ProductContainerProps {
  _id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onEditClick: () => void;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ _id, imageUrl, name, price, quantity, onEditClick }) => {
  const { dialog, openDeleteDialog } = useDeleteProduct();

  return (
    <div className="max-w-xs p-6 relative group">
      <Card className="bg-gray-300 border-2 border-black">
        <CardHeader>
          <div className="border-2 border-black relative justify-center flex w-full h-full rounded-xl">
            <img src={imageUrl} alt={name} className="group-hover:opacity-50 transition-opacity duration-300 rounded-xl" style={{ width: '250px', height:'' }} />
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <AiTwotoneEdit className="text-black size-8 hover:text-deep-orange-900" onClick={onEditClick} />
              <BsTrash className="text-black size-8 hover:text-deep-orange-900" onClick={() => openDeleteDialog(_id)} />
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="text-black space-y-2">
            <p className="text-2xl break-words">{name}</p>
            <p className="text-lg">${price}</p>
            <p className="text-lg">Cantidad: {quantity}</p>
          </div>
        </CardFooter>
      </Card>
      {dialog}
    </div>
  );
};

export default ProductContainer;
