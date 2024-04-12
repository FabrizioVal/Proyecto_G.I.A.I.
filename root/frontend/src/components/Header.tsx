// cuando se suben bien los datos, meter una animacion de alerta de las que salen del costado abajo a la izquierda informando si se pudo subir o no

'use client'

import { Button, Input} from "@material-tailwind/react";
import { useState } from 'react';

const Dialog = ({ onClose }) => {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
      <div id="dialog" style={{ width: '70vw', height: '70vh' }} className=' bg-blue-gray-400 relative flex flex-col items-center justify-center'>
        <span className=' absolute top-6 left-10 text-2xl'>Dialog box</span>
        <button className=" absolute top-0 right-0 mr-4 mt-1 text-white text-4xl" onClick={onClose}>&times;</button>

        <div className='p-2 flex justify-center items-center w-full mt-10'>
          <div className='w-1/2'>


            <h2 className='absolute top-20 '>Añadir imagen:</h2>
            <input className="mb-2 mt-6 absolute top-20 justify-center items-center" type="file" onChange={handleChange} />
            {file && <img 
            src={file} 
            className='block mx-auto my-auto mt-8' 
            alt="Imagen a subir" 
            style={{width: '200px', height: '200px' }} />}
          </div>
          <div className='w-1/2 p-4'>

          <h2 className="absolute top-20">A continuacion, inserte los siguientes datos:</h2>
          
          <div className="flex flex-col gap-4">
          <Input  
          color="indigo" 
          label="Nombre" 
          className=" bg-white"
          />
          <Input 
          color="indigo" 
          label="Precio" 
          className=" bg-white"
          />
          <Input 
          color="indigo" 
          label="Cantidad"
          className=" bg-white"
          /> 
          </div>         

          </div>
        </div>

        <button className='absolute bottom-4 right-4'>Guardar cambios</button>
     
      </div>
    </div>
  );
};

const Header = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDialogVisible(!isDialogVisible); // Toggle visibility of the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false); // Hide the dialog
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
        <Button style={{ borderColor: '#ff0000' }} onClick={handleButtonClick}>
          Añadir producto
        </Button>
      </div>
      {isDialogVisible && <Dialog onClose={handleCloseDialog} />} {/* Render the Dialog component if isDialogVisible is true */}
    </div>
  );
};

export default Header;
