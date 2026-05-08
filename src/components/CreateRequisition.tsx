'use client';
import {API_ENDPOINTS, send} from '@/lib/api';
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import Button from '@/components/utils/Button';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalContent from '@/components/modal/ModalContent';
import ModalFooter from '@/components/modal/ModalFooter';
import ModalContainer from '@/components/modal/ModalContainer';
import Form from '@/components/forms/Form';
import Badge from '@/components/utils/Badge';
import {format} from 'date-fns';
import {useFetcher} from "@/app/hooks/useFetcher";
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';


export default function CreateRequisition({
  buttonLabel = 'New Requisition',
  buttonClassName = '',
  buttonIntent = 'primary',
}) {
  const {data: currencies={}} = useFetcher( API_ENDPOINTS.CURRENCIES);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
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
      const formattedDate = format(nextDate, 'yyyy-MM-dd');
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
      closeModal();
      startNavigation('Opening new requisition...');
      router.push('/requisitions/' + result.id );
    } catch (e) {
      console.log(`Could not create requisition`);
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
              intent={buttonIntent as any}
              className={`oasis-button flex items-center justify-center space-x-1 rounded-2xl px-4 py-2 text-center ${buttonClassName}`}> {buttonLabel}</Button>
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader closeModal={closeModal} title={'Create Requisition'}/>
          <ModalBody>
            <div className="w-full text-start">
                <div>
                  Unless updated, this requisition is scheduled for: <br/><Badge  variant={'success'} size={'large'}>{getNextDayWithDayName()}</Badge>
                </div>
              <Form
                handleSubmit={createRequisition}
                fields={pricingForm}
              />
            </div>
          </ModalBody>
          <ModalFooter closeModal={closeModal}>
            <Button onClick={() => createRequisition()} size="small" intent={'primary'}
                    className="oasis-button rounded-2xl px-4 py-2">Create Requisition</Button>
          </ModalFooter>
        </ModalContent>

      </ModalContainer>
    </>

  );
}
