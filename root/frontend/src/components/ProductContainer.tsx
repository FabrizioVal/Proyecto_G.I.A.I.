import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsTrash } from 'react-icons/bs';
import { editProduct } from '../controllers/EditProduct.tsx';
import { deleteProduct } from '../controllers/EraseProduct.tsx'; // import the deleteProduct function

const ProductContainer = ({ _id, imageUrl, name, price, quantity }) => {
  const { dialog: editDialog, setOpen: setEditOpen, setProductData } = editProduct(); // Use the hook to edit product
  const { dialog: deleteDialog, openDeleteDialog } = deleteProduct(); // Use the hook to delete product

  console.log("ProductContainer Props:", { _id, imageUrl, name, price, quantity });

  const handleEditClick = (_id) => {
    setProductData({
      _id,
      productName: name,
      productPrice: price,
      productQuantity: quantity,
      file: imageUrl,
    });

    console.log("Product data after setting:", {
      productName: name,
      productPrice: price,
      productQuantity: quantity,
      file: imageUrl,
    });

    setEditOpen(true);
    console.log("Dialog should open");
  };

  const handleDeleteClick = (_id) => {
    openDeleteDialog(_id); // Open the delete dialog and set the product ID
  };

  return (
    <div className="max-w-xs p-6 relative group">
      <Card className="bg-gray-300 border-2 border-black">
        <CardHeader>
          <div className="border-2 border-black relative justify-center flex w-full h-full rounded-xl">
            <img src={imageUrl} alt={name} className="group-hover:opacity-50 transition-opacity duration-300 rounded-xl" style={{ width: '250px', height:'' }} />
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <AiTwotoneEdit className="text-black size-8 hover:text-deep-orange-900" onClick={() => handleEditClick(_id)} />
              <BsTrash className="text-black size-8 hover:text-deep-orange-900" onClick={() => handleDeleteClick(_id)} />
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="-mb-2 -mt-4 text-black">

          <p style={{ fontSize: '30px' }} className="mr-4">{name}</p>
          <p style={{ fontSize: '20px' }} className="mr-4 mt-2">${price}</p>
          <p style={{ fontSize: '20px' }} className="mr-4 mt-2">Quantity:{quantity}</p>
          
          </div>
        </CardFooter>
      </Card>
      {editDialog}
      {deleteDialog}
    </div>
  );
};

export default ProductContainer;
