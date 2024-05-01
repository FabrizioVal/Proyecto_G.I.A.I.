/* Esta es la barra de botones. Por un tema de organizacion, aca estaran los botones los cuales activan diferentes funciones
Estas funciones de frontend estan en la carpeta de controllers. Cada boton tiene una funcion diferente. */ 

import { Button } from "@material-tailwind/react";
import { sendProduct } from '../controllers/LocalProduct';

const Header = () => {
  const { dialog, setOpen } = sendProduct();

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        
        <Button>barra de busqueda</Button>
        
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
