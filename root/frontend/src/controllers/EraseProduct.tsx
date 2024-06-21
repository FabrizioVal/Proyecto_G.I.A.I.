// EraseProduct.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import axios from 'axios';

export const useDeleteProduct = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openDeleteDialog = (_id: string) => {
    setProductId(_id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/products/eliminarProducto/${productId}`);
      setOpen(false);
      toast.success('¡Producto eliminado exitosamente! Refrescando...', {
        theme: "dark",
        });
        setTimeout(() => {
          window.location.reload(); // Refresh the page after a delay
        }, 2000); 
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error al eliminar el producto: ${error.message}`);
    }
  };

  const dialog = (
    <Dialog open={open} className='border-black border-2' size="sm" handler={() => setOpen(false)}>
      <div className="rounded-t-md flex flex-col items-start bg-red-500 border-black w-full">
        <div className="flex items-center justify-between w-full">
          <DialogHeader className="flex flex-col items-start w-full">
            <Typography className="mb-1 text-black" variant="h4">
              Eliminar Producto
            </Typography>
          </DialogHeader>
        </div>
        <div className="w-full border-b-4 border-red-900"></div> 
      </div>
      <DialogBody className="flex justify-center items-center">
        <Typography className="mt-3" variant="h5">
          ¿Estás seguro de que quieres eliminar este producto?
        </Typography>
        <Typography className="text-red-500 mt-2">{errorMessage}</Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
      <div className="w-full mb-4 border-t-2 border-gray-400"></div>
        <Button variant="text" color="gray" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button variant="gradient" color="red" onClick={confirmDelete}>
          Eliminar
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return { dialog, openDeleteDialog };
};
