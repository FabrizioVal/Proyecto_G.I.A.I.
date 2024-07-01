/* Funcion de barra de busqueda Y ETIQUETAS, ambas sincronizadas con el inventario
RENOMBRAR Y ACOMODAR PARA MEJOR ENTENDIMIENTO */

import React, { useState } from 'react';
import Header from '../components/ButtonBar';
import Inventory from '../components/Inventory';
import { Product } from '../../../backend/models/product.ts'; // modelo de producto

const ParentComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortFunction, setSortFunction] = useState<(products: Product[]) => Product[]>(products => products);

  const handleSort = (sortFunc: (products: Product[]) => Product[]) => {
    setSortFunction(() => sortFunc);
  };

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} handleSort={handleSort} />
      <Inventory searchQuery={searchQuery} sortFunction={sortFunction} />
    </div>
  );
};

export default ParentComponent;