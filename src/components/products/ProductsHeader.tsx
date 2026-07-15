import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {DownloadCloud} from 'react-feather';


const ProductsHeader = ({onAddProduct, addLabel = 'Add'}: { onAddProduct?: () => void, addLabel?: string }) => {
  const linkUrl = onAddProduct || '/products/create';
  const actions = [
    {
      icon: (
        <DownloadCloud size={20}/>
      ),
      text: 'Export',
      onClick: () => {
        // Handle import action
      },
    },
    // ... other action objects ...
  ];


  return (
    <EntityHeader title="Products" actions={actions} addAction={linkUrl} addLabel={addLabel}/>
  );
};

export default ProductsHeader;
