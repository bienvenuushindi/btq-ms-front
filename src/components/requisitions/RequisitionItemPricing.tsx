'use client';
import React, {useState} from 'react';
import {send} from '@/lib/api';
import Form from '@/components/Form';
import useQuantityTypes from '@/app/hooks/useQuantityTypes';
import useCurrencies from '@/app/hooks/useCurrencies';
import SuppliersSection from '@/components/requisitions/SuppliersSection';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {delay} from '@/lib/async';
import toastShow from '@/components/toast/toast-selector';

export default function RequisitionItemPricing({requisitionId, productDetails}) {
  const {data: quantityType = {}} = useQuantityTypes();
  const {data: currencies = {}} = useCurrencies();

  const initial = {
    price: productDetails.price || 0,
    currency: productDetails.currency || null,
    found: productDetails.found || false,
    quantity: productDetails.quantity || 0,
    quantity_type: productDetails.quantity_type,
    note: productDetails.note || '',
    expired_date: productDetails.expired_date || null,
  };
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({...initial});
  const [supplierId, setSupplierId] = useState(productDetails.supplier_id);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplierId) {
      setError('Please select a supplier');
      return;
    }

    setLoading(true);
    await delay(2000);
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`requisition_product[${key}]`, formState[key]);
    });
    formData.append('requisition_product[supplier_id]', supplierId);
    try {
      await send('/requisitions/' + requisitionId + '/update_products/' + productDetails.product_detail_id, formData, 'PUT');
      if (supplierId != productDetails.supplier_id) productDetails.supplier_id = supplierId;
      console.log('success');
      toastShow('success', 'Updated Successfully')
      setLoading(false);
    } catch (e) {
      setError(`Could not create product`);
    }
  };
  const pricingForm = [
    {
      label: 'Status',
      input_type: 'toggle',
      className: '',
      labelClassName: '',
      name: 'found',
      checked: formState.found,
      action: () => {
        setFormState((s) => ({...s, found: !formState.found}));
        productDetails.found = !productDetails.found
      }
    },
    [{
      label: 'Price',
      required: true,
      placeholder: 'Price',
      value: formState.price,
      name: 'price',
      type: 'number',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, price: e.target.value}));
        productDetails.price = e.target.value
      },
    },
      {
        label: 'Select currency',
        required: true,
        placeholder: 'Select currency',
        name: 'currency',
        value: formState.currency || '',
        input_type: 'select',
        className: '',
        options: Object.keys(currencies).map((c) => ({code: c, name: c.toUpperCase()})),
        action: (e) => {
          setFormState((s) => ({...s, currency: e.target.value}));
          productDetails.currency = e.target.value
        }
      },
      {
        label: 'Select quantity type',
        required: true,
        placeholder: 'Select quantity type',
        name: 'quantity_type',
        value: formState.quantity_type || '',
        input_type: 'select',
        className: '',
        options: Object.values(quantityType).map((q) => ({code: q, name: q.toUpperCase()})),
        action: (e) => {
          setFormState((s) => ({...s, quantity_type: e.target.value}));
          productDetails.quantity_type = e.target.value
        }
      }],
    [{
      label: 'Quantity',
      required: true,
      placeholder: 'Quantity',
      value: formState.quantity,
      name: 'quantity',
      type: 'number',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, quantity: e.target.value}));
        productDetails.quantity = e.target.value
      },
    },
      {
        label: 'Quantity type',
        required: true,
        placeholder: 'Select quantity type',
        name: 'quantity_type',
        value: formState.quantity_type || '',
        input_type: 'select',
        className: '',
        disabled: true,
        options: Object.values(quantityType).map((q) => ({code: q, name: q.toUpperCase()})),
        action: (e) => {
          setFormState((s) => ({...s, quantity_type: e.target.value}));
          productDetails.quantity_type = e.target.value
        }
      }], {
      label: 'Expired date',
      placeholder: 'Expired Date',
      value: formState.expired_date,
      name: 'expired_date',
      type: 'date',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, expired_date: e.target.value}));
        productDetails.expired_date = e.target.value
      },
    },
    {
      label: 'Note',
      placeholder: 'Enter note',
      value: formState.note,
      name: 'note',
      input_type: 'text-area',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, note: e.target.value}));
        productDetails.note = e.target.value
      },
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: loading ? 'Loading...' : 'Update',
      disabled: loading
    }
  ];

  const updateForm = (supplier) => {
    setSupplierId(supplier.id);
    if (supplier.id == productDetails.supplier_id) {
      setFormState({...initial});
      return;
    }
    setFormState((s) => ({...s, ...supplier, quantity: 0}));
  };
  return (
    <Card className={'flex justify-between gap-4'}>
      <SuppliersSection
        action={updateForm}
        suppliers={productDetails.suppliers}
        productId={productDetails.product_detail_id}
        supplierId={supplierId}
      />
      <div className="flex flex-col grow border-gray-100 border p-2 rounded">
        <div className="flex justify-end">
          {productDetails.found ? <Badge variant={'success'}>Found</Badge> :
            <Badge variant={'danger'}> Not Found</Badge>}
        </div>
        <Form
          handleSubmit={handleSubmit}
          fields={pricingForm}
        />
      </div>
      <ToastContainer/>
    </Card>
  );
}