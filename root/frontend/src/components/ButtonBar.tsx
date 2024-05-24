/* Esta es la barra de botones. Por un tema de organizacion, aca estaran los botones los cuales activan diferentes funciones
Estas funciones de frontend estan en la carpeta de controllers. Cada boton tiene una funcion diferente. */ 

import React, { ChangeEvent } from 'react';
import { Button, 
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input, } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { sendProduct } from '../controllers/LocalProduct';
import {
  handleQuantityAsc,
  handleQuantityDesc,
  handlePriceAsc,
  handlePriceDesc,
} from '../controllers/Tags';
import { Product } from '../../../backend/models/product.ts'; // modelo de producto

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSort: (sortFunc: (products: Product[]) => Product[]) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery, handleSort }) => {
  const { dialog, setOpen } = sendProduct();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative flex w-full max-w-[20rem]">
          <Input
            type="text"
            label="Buscar un producto"
            onChange={handleInputChange}
            className="pr-20"
            containerProps={{ className: "min-w-0" }}
          />
          
             <FaSearch className="w-5 h-5 !absolute rounded right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
         
        </div>
        <Button style={{ borderColor: '#ff0000' }} onClick={handleButtonClick}>
          Añadir producto
        </Button>


         <Menu placement="right-start">
      <MenuHandler>
        <Button>Etiquetas</Button>
      </MenuHandler>
      <MenuList>
        
        
        <Menu
          placement="right-start"
          open={openMenu}
          handler={setOpenMenu}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <MenuItem>
              Cantidad
              <IoIosArrowUp
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "rotate-90" : ""
                }`}
              />
            </MenuItem>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() =>  handleSort(handleQuantityDesc)}>Mayor a menor</MenuItem>
            <MenuItem onClick={() => handleSort(handleQuantityAsc)}>Menor a mayor</MenuItem>
          </MenuList>
        </Menu>

        <Menu
          placement="right-start"
          open={openMenu1}
          handler={setOpenMenu1}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <MenuItem>
              Precio
              <IoIosArrowUp
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu1 ? "rotate-90" : ""
                }`}
              /> 
            </MenuItem>
          </MenuHandler>
          <MenuList>
          <MenuItem onClick={() => handleSort(handlePriceDesc)}>Mayor a menor</MenuItem>
            <MenuItem onClick={() => handleSort(handlePriceAsc)}>Menor a mayor</MenuItem>
          </MenuList>
        </Menu>

      </MenuList>
    </Menu>


        
      </div>
      {dialog}
    </div>
  );
};

export default Header;