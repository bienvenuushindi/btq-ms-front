import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {DownloadCloud} from 'react-feather';


const SuppliersHeader = () => {
  const  linkUrl= '/suppliers/create';
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
    <EntityHeader title="Suppliers" actions={actions}  addAction={linkUrl}/>
  );
};

export default SuppliersHeader;
