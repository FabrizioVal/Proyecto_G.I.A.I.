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
        }, 3500); // 3.5 segundos
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error al eliminar el producto: ${error.message}`);
    }
  };

  const dialog = (
    <Dialog open={open} size="sm" handler={() => setOpen(false)}>
      <DialogHeader className="flex flex-col items-start">
        <Typography className="mb-1" variant="h4">
          Eliminar Producto
        </Typography>
      </DialogHeader>
      <DialogBody className="flex justify-center items-center">
        <Typography className="mb-1" variant="h5">
          ¿Estás seguro de que quieres eliminar este producto?
        </Typography>
        <Typography className="text-red-500 mt-2">{errorMessage}</Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
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
