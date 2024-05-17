/* Funcion de barra de busqueda */

import React, { useState } from 'react';
import Header from '../components/ButtonBar';
import Inventory from '../components/Inventory';

const ParentComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} />
      <Inventory searchQuery={searchQuery} />
    </div>
  );
};

export default ParentComponent;