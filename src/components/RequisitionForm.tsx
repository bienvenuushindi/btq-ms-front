'use client';
import React, {useState} from 'react';
import Button from './Button';
import {API_URL, send} from '@/lib/api';
import {SearchBar} from '@/components/SearchBar';
import ProductSearchResults from '@/components/products/ProductSearchResults';
import {Plus} from 'react-feather';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import ModalContainer from '@/components/modal/ModalContainer';
import {updateUrl} from '@/lib/utils';
export default function RequisitionForm({requisitionID, revalidate}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(API_URL + '/products/search');

  const updateParams = (newFilters) => {
    setUrl((prevUrl) => {
      return  updateUrl(prevUrl, newFilters);
    });
  }
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    const formData = new FormData();
    for (let i = 0; i < items.length; i++) {
      formData.append('requisition[product_detail_ids][]', items[i].id);
    }
    try {
      await send('/requisitions/' + requisitionID + '/add_products', formData);
      closeModal();
      setItems([]);
      revalidate();
    } catch (e) {
      setError(`Could not create product`);
    } finally {
    }
  };

  const itemsList = items.map((item, index) => <li key={item.id}>{index}{item.name}</li>);
  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => openModal()} size="small"
                intent={'primary'}
                className="px-3 py-2 rounded-md flex items-center space-x-1"> <Plus size={20} color={'#FFFFFF'}/> Add
          Products</Button>
      </div>

      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Add Product'}/>
          <ModalBody>
            <div className={' focus-within:shadow-lg'}>
              <SearchBar onSearch={updateParams}/>
              <div>
                {
                  (url ? <ProductSearchResults url={url} setItems={setItems}/> :
                    <span>Enter your query</span>)
                }
              </div>
            </div>
            {items.length === 0
              ? ''
              : <div>
                <span>{items.length} item(s)</span>
                <ul>
                  {itemsList}
                </ul>
              </div>}
          </ModalBody>
          <ModalFooter closeModal={closeModal}>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <Button type="submit">Add </Button>
            </form>
          </ModalFooter>
        </ModalContent>

      </ModalContainer>
    </>
  );
}

