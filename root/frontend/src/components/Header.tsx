// cuando se suben bien los datos, meter una animacion de alerta de las que salen del costado abajo a la izquierda informando si se pudo subir o no

'use client'

import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from 'react';
import axios from 'axios';

const Header = () => {
  
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  /* Estas constantes son usadas para poder buscar y subir la imagen guardada localmente */
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  /* Esta es la informacion del producto que voy a recibir */

  const [productName, setproductName] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [productQuantity, setproductQuantity] = useState('');

  /* Esta funcion enviara la informacion del nuevo producto al backend */
  
  const SendProduct = async () => {
    
    try {
      const response = await axios.post('/api/products/productoLocal', { productName, productPrice, productQuantity });
      console.log(response.data); // Mensaje de exito del backend
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <div className='w-full h-20 bg-blue-gray-500 flex items-center text-left text-xl'>
        <span className='ml-20'>G.I.A.I.</span>
      </div>
      <div>
        <h1 className='text-5xl ml-10 mb-10 mt-10'>Inventario</h1>
      </div>
      <div className="flex justify-center">
        <Button style={{ borderColor: '#ff0000' }} onClick={() => handleOpen()}>
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
             Añadir imagen
            </Typography>
            <input className="mb-2 mt-6 absolute bottom-0 justify-center items-center" type="file" onChange={handleChange} />
            {file && <img 
            src={file} 
            className='block mx-auto my-auto mb-4' 
            alt="Imagen a subir" 
            style={{width: '200px', height: '200px' }} />}
            
          </div>

          <div className="w-1/2 grid gap-7 justify-center items-center mb-2">
            
          <Typography className="mb-1 top-0 absolute" variant="h4">
             Añadir caracteristicas
            </Typography>

            
            <Input style={{width: '300px'}} label="Nombre" value={productName}/>  {/* esta mal usar "value", traba el input. Correjir */}
            <Input style={{width: '300px'}} label="Precio" value={productPrice}/>
            <Input style={{width: '300px'}} label="Cantidad" value={productQuantity}/>
            
          </div>
        </DialogBody>

        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
           Cancelar
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpen && SendProduct}>
            Añadir producto
          </Button>
        </DialogFooter>

      </Dialog>


      </div>
    </div>
  );
};

export default Header;
