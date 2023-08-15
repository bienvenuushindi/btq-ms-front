'use client';
import CreateRequisition from '@/components/CreateRequisition';
import {useRequisitions} from '@/app/hooks/useRequisitions';
import RequisitionsList from '@/components/requisitions/RequisitionsList';

export default function Requisitions() {
  const {data, meta, links, error, isLoading} = useRequisitions();
  return (
    <>
      {isLoading && !error ? (<div>Loading...</div>) :
        error ? <div>Failed to load</div> :
          <div>
            <CreateRequisition/>
            <div>
              <RequisitionsList items={data}/>
            </div>
          </div>}
    </>
  );
}