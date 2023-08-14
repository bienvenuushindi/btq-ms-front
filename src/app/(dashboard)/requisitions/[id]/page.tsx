'use client';
import RequisitionForm from '@/components/RequisitionForm';
import {useParams} from 'next/navigation';
import {useFetcher} from '@/app/hooks/useFetcher';
import RequisitionItemsTable from '@/components/RequisitionItemsTable';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import {SidebarContainer, SidebarContext} from '@/components/sidebar/SidebarContainer';
import {useContext} from 'react';

export default function Requisition() {
  const {openBar} = useContext(SidebarContext)
  const params = useParams();
  const requisitionId = params.id;
  const {data: requisition_items, mutate, error, isLoading} = useFetcher('/requisitions/' + requisitionId);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Failed to load</div>}
      {requisition_items && (
        <div className="relative h-full flex-col">
            <RequisitionForm revalidate={mutate} requisitionID={requisitionId}/>
           <div>
             <RequisitionItemsTable requisitionId={requisitionId} details={requisition_items.attributes.product_items}/>
           </div>
          <SidebarContainer>
            <SidebarContentSelector target={openBar.target}/>
          </SidebarContainer>
        </div>)
        }
    </>
  );
}
