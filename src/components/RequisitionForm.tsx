'use client';
import {useState} from 'react';
import Modal from 'react-modal';
import Button from './Button';
import {API_URL, send} from '@/lib/api';
import {SearchBar} from '@/components/SearchBar';
import ProductSearchResults from '@/components/products/ProductSearchResults';
import {useRouter} from 'next/navigation';
// Modal.setAppElement("#modal");
export default function RequisitionForm({requisitionID, revalidate}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState('');
  const callMe = (text) => {
    setUrl(text);
  };
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < items.length; i++) {
      formData.append('requisition[product_detail_ids][]', items[i].id);
    }
    try {
      await send('/requisitions/' + requisitionID + '/add_products', formData);
      closeModal();
      setItems([])
      revalidate()
    } catch (e) {
      setError(`Could not create product`);
    } finally {
    }
  };

  const itemsList = items.map((item, index) => <li key={item.id}>{index}{item.name}</li>);
  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ Add Products</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
        ariaHideApp={false}
      >
        <h1 className="text-3xl mb-6">Add Product</h1>
        <div className={' focus-within:shadow-lg'}>
          <SearchBar updateList={callMe} submitTo={API_URL + '/products/search'}/>
          <div>
            {
              (url ? <ProductSearchResults url={url} setItems={setItems}/> :
                <span>Enter your query</span>)
            }
          </div>
        </div>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Button type="submit">Add </Button>
          {items.length === 0
            ? ''
            : <div>
              <span>{items.length} item(s)</span>
              <ul>
                {itemsList}
              </ul>
            </div>}
        </form>
      </Modal>
    </div>
  );
}

