import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {useParams} from 'next/navigation';
import RequisitionForm from '@/components/RequisitionForm';


const RequisitionDetailsHeader = ({revalidate}) => {
  const params = useParams();
  const requisitionId = params.id;
  const actions = []
  return (
    <EntityHeader title="Requisition Details" actions={actions}>
      <RequisitionForm revalidate={revalidate} requisitionID={requisitionId}/>
    </EntityHeader>
  );
};

export default RequisitionDetailsHeader;