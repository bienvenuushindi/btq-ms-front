'use client';
import React, {useState} from 'react';
import Button from '@/components/Button';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import {PlusCircle} from 'react-feather';
import Card from '@/components/Card';
import ModalFooter from '@/components/modal/ModalFooter';
import AddSupplier from '@/components/pages/products/details/AddSuppliers';

export default function SelectProductVariant({details }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const openModal = () => {
    setIsOpen(true);
    setSelected(null)
  }
  const closeModal = () => {
    setIsOpen(false);
    setSelected(null)
  }
  function handleChange(value) {
    setSelected(value);
  }
  return (
    <>
      <Button onClick={() => openModal()}
              size="small"
              intent={'primary'}
              className="px-1 py-2 rounded-md flex items-center gap-1 text-sm"> <PlusCircle color="#FFFFFF" size={20}/>
        <span className="text-neutral-50">Add Supplier</span></Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Select Variant'}/>
          <ModalBody>
            {
              details.map((detail, index) => <ul key={detail.id}>
                <li>
                  <Card className={' flex items-center gap-2'}>
                    <input type="radio" name="supplier_id" onChange={()=>handleChange(detail.id)} value={detail.id}/>
                    <label> {detail.attributes.size}</label>
                  </Card>
                </li>
              </ul>)
            }
          </ModalBody>
          <ModalFooter closeModal={closeModal}>
            {selected && <AddSupplier productDetailID={selected} closeExternalModal={closeModal}/>}
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </>

  );
}