import React from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { editProduct } from '../controllers/EditProduct.tsx';
import { deleteProduct } from '../controllers/EraseProduct.tsx'; // import the deleteProduct function

const ProductContainer = ({  _id, imageUrl, name, price, quantity }) => {
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
      <Card className="bg-gray-300">
        <CardHeader>
          <div className="relative justify-center flex w-full h-full">
            <img src={imageUrl} alt={name} />
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <BsThreeDots className="text-gray-700 size-8" onClick={() => handleEditClick(_id)} />
              <BsTrash className="text-gray-700 size-8" onClick={() => handleDeleteClick(_id)} />
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
      {editDialog}
      {deleteDialog}
    </div>
  );
};

export default ProductContainer;
