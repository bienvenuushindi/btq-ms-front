'use client';
import {send} from '@/lib/api';
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import Button from '@/components/Button';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalContent from '@/components/modal/ModalContent';
import ModalFooter from '@/components/modal/ModalFooter';
import ModalContainer from '@/components/modal/ModalContainer';
import Form from '@/components/Form';
import useCurrencies from '@/app/hooks/useCurrencies';
import Badge from '@/components/Badge';


export default function CreateRequisition() {
  const {data: currencies={}} = useCurrencies();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const router = useRouter();
  const getNextDayWithDayName = useCallback(
    (currentDate = new Date(), daysToAdd = 1) => {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const nextDate = new Date(currentDate);
      const currentDay = nextDate.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      // Check if it's Saturday (currentDay === 6)
      if (currentDay === 6) {
        daysToAdd = 2; // If it's Saturday, set daysToAdd to 2 to skip Sunday and go to Monday
      }
      nextDate.setDate(nextDate.getDate() + daysToAdd);
      const dayName = daysOfWeek[nextDate.getDay()];
      const day = nextDate.getDate();
      const month = (nextDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero to the month
      const year = nextDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      return `${dayName}, ${formattedDate}`;
    },
    []
  );

  const getNextDay= () => {
    return getNextDayWithDayName().split(', ')[1].trim()
  }


  const initial = {
    currency: 'usd',
    date: getNextDay()
  };
  const [formState, setFormState] = useState({...initial});

  const [date, setDate] = useState(getNextDay());
  const createRequisition = async () => {
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`requisition[${key}]`, formState[key]);
    });
    try {
      const result = await send('/requisitions', formData);
      router.replace('/requisitions/' + result.id );
    } catch (e) {
      console.log(`Could not create requisition`);
      console.log(e);
    } finally {
    }
  };

  const pricingForm = [
    {
      label: 'Select currency',
      required: true,
      placeholder: 'Select currency',
      name: 'currency',
      value: formState.currency || '',
      input_type: 'select',
      className: '',
      options: Object.keys(currencies).map((c)=>({code: c, name: c.toUpperCase()})),
      action: (e) => {
        setFormState((s) => ({...s, currency: e.target.value}));
      }
    },{
      label: 'Select date',
      required: true,
      placeholder: 'Select date',
      name: 'date',
      value: formState.date || '',
      input_type: 'text',
      type: 'date',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, date: e.target.value}));
      }
    }
    ];
  return (
    <>
      <Button onClick={() => openModal()}
              size="small"
              intent={'primary'}
              className="px-3 py-2 rounded-md flex items-center space-x-1"> New Requisition</Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Create Requisition'}/>
          <ModalBody>
            <div className="w-full text-start">
                <div>
                  Unless update, this requisition is programmed on : <br/><Badge  variant={'success'} size={'large'}>{getNextDayWithDayName()}</Badge>
                </div>
              <Form
                handleSubmit={createRequisition}
                fields={pricingForm}
              />
            </div>
          </ModalBody>
          <ModalFooter closeModal={closeModal}>
            <Button onClick={() => createRequisition()} size="small" intent={'primary'}
                    className="px-2 py-1">Create</Button>
          </ModalFooter>
        </ModalContent>

      </ModalContainer>
    </>

  );
}

