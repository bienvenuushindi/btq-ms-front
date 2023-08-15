'use client';
import Modal from 'react-modal';
import {send} from '@/lib/api';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function CreateRequisition() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const router = useRouter();


  const getNextDays = (currentDate = new Date(), daysToAdd = 1) => {
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() + daysToAdd)
    return `${nextDate.getDate()}-${nextDate.getMonth() + 1}-${nextDate.getFullYear()}`;
  }

  const [date, setDate] = useState(getNextDays());
  const createRequisition = async () => {
    const formData = new FormData();
    formData.append('requisition[date]', date);
    try {
      const result = await send('/requisitions', formData);
      router.replace('/requisitions/' + result.id + '/create');
    } catch (e) {
      console.log(`Could not create requisition`);
      console.log(e);
    } finally {
    }
  };
  return (
    <>
      <Button onClick={() => openModal()}>+ New Requisition</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
        ariaHideApp={false}
      >
        <apn>This requisition is programmed on : {date}</apn>
        <Input type={'date'} value={date} onChange={(e) => setDate(e.target.value)}/>

        <Button onClick={() => createRequisition()}>Create</Button>
      </Modal>
    </>

  );
}