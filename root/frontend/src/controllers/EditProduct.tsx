import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
  Alert,
} from "@material-tailwind/react";
import axios from 'axios';

export const editProduct = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    _id: '',
    productName: '',
    productPrice: '',
    productQuantity: '',
    file: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

  const handleChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= MAX_FILE_SIZE) {
      setProductData(prevData => ({ ...prevData, file: selectedFile }));
    } else {
      alert('Selected file exceeds the maximum size limit of 2 MB.');
      e.target.value = null;
    }
  };

  const validateInputs = () => {
    const { productName, productPrice, productQuantity, file } = productData;
    if (!productName || !productPrice || !productQuantity || !file) {
      setErrorMessage('Llene todos los items para continuar');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const updateProduct = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const base64Image = await convertToBase64(productData.file);

      const requestData = {
        _id: productData._id,
        productName: productData.productName,
        productPrice: productData.productPrice,
        productQuantity: productData.productQuantity,
        file: base64Image,
      };

      const response = await axios.put(`http://localhost:3000/api/products/editarProducto/${productData._id}`, requestData);
      console.log(response.data);
      alert('Producto actualizado correctamente!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al actualizar el producto: ${error?.message}`);
    }
  };

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = error => reject(error);
    });
  }

  const dialog = (
    <Dialog className='border-black border-2 ' open={open} size="xl" handler={() => setOpen(false)}>
      <div className="rounded-t-md flex flex-col items-start bg-[#CD893A] border-black w-full">
        <div className="flex items-center justify-between w-full">
          <DialogHeader className="flex flex-col items-start w-full">
            <Typography className="mb-1 text-black" variant="h4">
              Editar Producto
            </Typography>
          </DialogHeader>
        </div>
        <div className="w-full border-b-4 border-[#8F5816]"></div> 
      </div>

      <DialogBody className="flex justify-center items-center mt-6" style={{ height: '320px' }}>
        <div className="w-1/2 grid gap-2">
          <Typography className="mb-1 absolute top-0" variant="h4">
            Editar imagen
          </Typography>
          <input className="mb-2 mt-6 absolute bottom-0 justify-center items-center" type="file" onChange={handleChange} accept='.jpeg, .png, .jpg' />
          {productData.file && typeof productData.file !== 'string' && (
            <img src={URL.createObjectURL(productData.file)} className='block mx-auto my-auto mb-4' alt="Imagen a subir" style={{ width: '200px', height: '200px' }} />
          )}
        </div>

        <div className="w-1/2 grid gap-7 justify-center items-center mt-16">
          <Typography className="mb-1 ml-2 top-0 absolute" variant="h4">
            Editar características
          </Typography>
          <Input style={{ width: '300px' }} label="Nombre" value={productData.productName} onChange={(e) => setProductData(prevData => ({ ...prevData, productName: e.target.value }))} />
          <Input style={{ width: '300px' }} label="Precio" value={productData.productPrice} onChange={(e) => setProductData(prevData => ({ ...prevData, productPrice: e.target.value }))} />
          <Input style={{ width: '300px' }} label="Cantidad" value={productData.productQuantity} onChange={(e) => setProductData(prevData => ({ ...prevData, productQuantity: e.target.value }))} />
          <Typography className="text-red-500">{errorMessage}</Typography>
        </div>
      </DialogBody>

      <DialogFooter className="space-x-2">
         <div className="w-full mb-4 border-t-2 border-gray-400"></div>
        <Button variant="text" className="border-black border-2" color="gray" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button variant="gradient" color="black" className=" border-[#383838] border-2" onClick={updateProduct}>
          Actualizar producto
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return { dialog, setOpen, setProductData };
};
