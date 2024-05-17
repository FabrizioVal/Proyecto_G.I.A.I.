/* Esta es la barra de botones. Por un tema de organizacion, aca estaran los botones los cuales activan diferentes funciones
Estas funciones de frontend estan en la carpeta de controllers. Cada boton tiene una funcion diferente. */ 

import React, { ChangeEvent } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { sendProduct } from '../controllers/LocalProduct';

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const { dialog, setOpen } = sendProduct();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="text"
            label="Buscar un producto"
            onChange={handleInputChange}
            className="pr-20"
            containerProps={{ className: "min-w-0" }}
          />
          <Button size="sm" className="!absolute right-1 top-1 bottom-1 rounded">
            <FaSearch className="w-4 h-4" />
          </Button>
        </div>
        <Button style={{ borderColor: '#ff0000' }} onClick={handleButtonClick}>
          Añadir producto
        </Button>
        <Button>etiquetas</Button>
      </div>
      {dialog}
    </div>
  );
};

export default Header;