'use client'
import React, {useEffect, useState} from 'react';
import {deleteItem} from '@/lib/api';
import DeleteAlert from '@/components/DeleteAlert';
import ContainerOne from '@/components/ContainerOne';
import ReqProductItem from '@/components/requisitions/ReqProductItem';
import Card from '@/components/Card';
import Text from "@/components/Text";


export default function ReqItemProductList({details, requisitionId}) {
  const [data, setData] = useState(details);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (id) => {
    setOpenAccordion(id === openAccordion ? null : id);
  };
  useEffect(() => {
    setData(details);
  }, [details]);
  const handleCancelDelete = () => {
    setShowDeleteAlert(false);
  };
  const handleConfirmDelete = async () => {
    const newList= data.filter(item => item.product_detail_id != itemToDelete)
    await deleteItem('/requisitions/' + requisitionId + '/product_details/' + itemToDelete + '/remove_item');
    setData(newList);
    setShowDeleteAlert(false);
  };
  const removeItem = async (id) => {
    setShowDeleteAlert(true);
    setItemToDelete(id);
  };
  return (
    <ContainerOne>
      <Card className='w-full'>
        <Text intent="tertiary" size="large" className="font-extrabold">Items</Text>
        <ul className=" mx-auto py-2">
          {data.map((row) => {
            row.isOpen = false;
            return <li key={row.id}
                       className="flex w-full items-start justify-center gap-2 mb-2 py-1 border-b border-gray-100 rounded ">
              <ReqProductItem
                row={row}
                requisitionId={requisitionId}
                removeItem={removeItem}
                openAccordion={openAccordion}
                toggleAccordion={toggleAccordion}
              />
            </li>;
          })}
        </ul>
      </Card>
      {showDeleteAlert && (
        <DeleteAlert onCancel={handleCancelDelete} onDelete={handleConfirmDelete} show={showDeleteAlert}/>
      )}
    </ContainerOne>
  )
}