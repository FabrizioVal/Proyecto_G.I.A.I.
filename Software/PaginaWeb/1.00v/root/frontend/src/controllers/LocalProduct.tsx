// AddProduct.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import axios from 'axios';

interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onProductAdd: () => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ open, onClose, onProductAdd }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= MAX_FILE_SIZE) {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      // Handle file size exceeds limit
      setErrorMessage('El archivo seleccionado supera los 2 Megabytes.');
      // Clear the file input
      e.target.value = '';
    }
  };

  const validateInputs = () => {
    if (!productName || !productPrice || !productQuantity || !file) {
      setErrorMessage('Llene todos los items para continuar');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const sendProduct = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const base64Image = await convertToBase64(file);

      const requestData = {
        productName,
        productPrice,
        productQuantity,
        file: base64Image,
      };

      const response = await axios.post('http://localhost:3000/api/products/productoLocal', requestData);
      console.log(response.data);

      onClose(); // Close the dialog
      toast.success('¡Producto añadido exitosamente! Refrescando...', {
        theme: "dark",
        });
        setTimeout(() => {
          window.location.reload(); // Refresh the page after a delay
        }, 3500); // 3.5 segundos
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al añadir el producto: ${error.message}`);
    }
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <Dialog className='border-black border-2' open={open} size="xl" handler={onClose}>
      <div className="rounded-t-md flex flex-col items-start bg-[#CD893A] border-black w-full">
        <div className="flex items-center justify-between w-full">
          <DialogHeader className="flex flex-col items-start w-full">
            <Typography className="mb-1 text-black" variant="h4">
            Ingrese los datos del nuevo producto
            </Typography>
          </DialogHeader>
        </div>
        <div className="w-full border-b-4 border-[#8F5816]"></div> 
      </div>

      <DialogBody className="flex justify-center items-center mt-6" style={{ height: '320px' }}>
        <div className="w-1/2 grid gap-2">
          <Typography className="mb-1 absolute top-0" variant="h4">
            Añadir imagen
          </Typography>
          <input
            className="mb-2 mt-6 absolute bottom-0 justify-center items-center"
            type="file"
            onChange={handleChange}
            accept=".jpeg, .png, .jpg"
          />
          {file && <img src={URL.createObjectURL(file)} className="block mx-auto my-auto mb-4" alt="Imagen a subir" style={{ width: '200px', height: '200px' }} />}
        </div>

        <div className="w-1/2 grid gap-7 justify-center items-center mt-16">
          <Typography className="mb-1 top-0 absolute" variant="h4">
            Añadir características
          </Typography>
          <Input style={{ width: '300px' }} label="Nombre" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <Input style={{ width: '300px' }} label="Precio" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <Input style={{ width: '300px' }} label="Cantidad" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          <Typography className="text-red-500">{errorMessage}</Typography>
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
      <div className="w-full mb-4 border-t-2 border-gray-400"></div>
        <Button variant="text" className='border-black border-2' color="gray" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="gradient" color="black" onClick={sendProduct}>
          Añadir producto
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddProduct;
