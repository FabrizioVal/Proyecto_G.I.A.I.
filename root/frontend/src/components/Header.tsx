import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [file, setFile] = useState('');

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const SendProduct = async () => {
  try {

    const base64Image = await convertToBase64(file);

    const requestData = {
      productName: productName,
      productPrice: productPrice,
      productQuantity: productQuantity,
      file: base64Image,
    };

    console.log('productName:', productName);
    console.log('productPrice:', productPrice);
    console.log('productQuantity:', productQuantity);

    const response = await axios.post('http://localhost:3000/api/products/productoLocal', requestData);
    console.log(response.data);
    alert(`Producto añadido correctamente!`);
  } catch (error) {
    console.error('Error:', error);
    alert(`Error al añadir el producto: ${error.message}`);
  }
};


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

  return (
    <div>
      <div className='w-full h-20 bg-blue-gray-500 flex items-center text-left text-xl'>
        <span className='ml-20'>G.I.A.I.</span>
      </div>
      <div>
        <h1 className='text-5xl ml-10 mb-10 mt-10'>Inventario</h1>
      </div>
      <div className="flex justify-center">
        <Button style={{ borderColor: '#ff0000' }} onClick={handleOpen}>
          Añadir producto
        </Button>

        <Dialog open={open} size="xl" handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
              <Typography className="mb-1" variant="h4">
                Ingrese los datos del nuevo producto
              </Typography>
            </DialogHeader>
          </div>

          <DialogBody className='flex justify-center items-center' style={{ height: '320px' }}>
            <div className="w-1/2 grid gap-2">
              <Typography className="mb-1 absolute top-0" variant="h4">
                Añadir imagen (Menor a 50mb)
              </Typography>
              <input className="mb-2 mt-6 absolute bottom-0 justify-center items-center" type="file" onChange={handleChange}  accept='.jpeg, .png, .jpg'/>
              {file && <img src={URL.createObjectURL(file)} className='block mx-auto my-auto mb-4' alt="Imagen a subir" style={{width: '200px', height: '200px' }} />}   
            </div>

            <div className="w-1/2 grid gap-7 justify-center items-center mb-2">
              <Typography className="mb-1 top-0 absolute" variant="h4">
                Añadir características
              </Typography>
              <Input style={{width: '300px'}} label="Nombre" value={productName} onChange={(e) => setProductName(e.target.value)}/>
              <Input style={{width: '300px'}} label="Precio" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
              <Input style={{width: '300px'}} label="Cantidad" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)}/>
            </div>
          </DialogBody>

          <DialogFooter className="space-x-2">
            <Button variant="text" color="gray" onClick={handleOpen}>
              Cancelar
            </Button>
            <Button variant="gradient" color="gray" onClick={SendProduct}>
              Añadir producto
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
