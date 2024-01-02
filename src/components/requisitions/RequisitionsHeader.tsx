import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {DownloadCloud} from 'react-feather';
import CreateRequisition from '@/components/CreateRequisition';


const RequisitionsHeader = () => {
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
    <EntityHeader title="Requisitions" actions={actions}>
      <CreateRequisition/>
    </EntityHeader>
  );
};

export default RequisitionsHeader;