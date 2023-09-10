import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {DownloadCloud} from 'react-feather';
import CreateCategory from '@/components/categories/CreateCategory';


const CategoriesHeader = ({revalidate}) => {
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
    <EntityHeader title="Categories" actions={actions}>
      <CreateCategory revalidate={revalidate}/>
    </EntityHeader>
  );
};

export default CategoriesHeader;