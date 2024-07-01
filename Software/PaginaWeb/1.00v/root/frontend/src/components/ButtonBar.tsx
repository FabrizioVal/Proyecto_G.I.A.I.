import React, { ChangeEvent, useState } from 'react';
import { Button, Menu, MenuHandler, MenuList, MenuItem, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import AddProduct from '../controllers/LocalProduct';
import {
  handleQuantityAsc,
  handleQuantityDesc,
  handlePriceAsc,
  handlePriceDesc,
} from '../controllers/Tags';
import { Product } from '../../../backend/models/product'; // modelo de producto

interface HeaderProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSort: (sortFunc: (products: Product[]) => Product[]) => void;
  onProductAdd: () => void; // Callback function for adding a product
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery, handleSort, onProductAdd }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenu1, setOpenMenu1] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    
    setAddDialogOpen(!addDialogOpen);
    onProductAdd(); // Assuming this function should handle product addition logic
  };

  const handleProductAdd = () => {
    setAddDialogOpen(false); // Close the AddProduct dialog after adding a product
    onProductAdd(); // Execute the function to handle product addition logic
  };

  return (
    <div>
      <div className="flex justify-start ml-10 space-x-2">
        <div className="relative flex w-full max-w-[20rem]">
          <Input
            type="text"
            label="Buscar un producto"
            onChange={handleInputChange}
            className="pr-20 border-black border-2"
            containerProps={{ className: "min-w-0" }}
          />
          <FaSearch className="w-5 h-5 !absolute rounded right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button style={{ borderColor: '#ff0000' }} onClick={handleButtonClick}>añadir producto</Button>

        <Menu placement="right-start">
          <MenuHandler>
            <Button>Filtros</Button>
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
                <MenuItem onClick={() => handleSort(handleQuantityDesc)}>Mayor a menor</MenuItem>
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
      
      {/* Render the AddProduct component with props */}
      <AddProduct
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onProductAdd={onProductAdd}
      />
    </div>
  );
};

export default Header;

