'use client';
import React, {useContext, useState} from 'react';
import {API_ENDPOINTS, send} from '@/lib/api';
import Form from '@/components/forms/Form';
import SuppliersSection from '@/components/requisitions/SuppliersSection';
import Badge from '@/components/utils/Badge';
import Card from '@/components/utils/wrappers/Card';
import 'react-toastify/dist/ReactToastify.css';
import {delay} from '@/lib/async';
import toastShow from '@/components/toast/toast-selector';
import {RequisitionContext} from '@/components/requisitions/RequisitionContext';
import clsx from 'clsx';
import SwitchCurrency from '@/components/requisitions/item-page/SwitchCurrency';
import {useFetcher} from "@/app/hooks/useFetcher";
import {useSWRConfig} from 'swr';

const formatCurrencyValue = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return value;

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export default function RequisitionItemPricing({productDetails}) {
  const {requisitionID, requisition} = useContext(RequisitionContext)
  const {mutate} = useSWRConfig();
  const {data: quantityType = {}} = useFetcher(API_ENDPOINTS.QUANTITY_TYPES);
  const {data: currencies = {}} = useFetcher( API_ENDPOINTS.CURRENCIES);
  const {currency} = useContext(RequisitionContext);
  const isArchived = Boolean(requisition?.archived);
  const [modalIsOpen, setIsOpen] = useState(false);
  const initial = {
    price: productDetails.price || 0,
    currency: productDetails.currency,
    status: productDetails.status || false,
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
    setError('');
    if (!supplierId) {
      setError('Please select a supplier');
      return;
    }
    if(currency != formState.currency){
      setIsOpen(true)
      return
    }
    setLoading(true);
    await delay(2000);
    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      formData.append(`requisition_product[${key}]`, formState[key]);
    });
    formData.append('requisition_product[supplier_id]', supplierId);
    try {
      await send('/requisitions/' + requisitionID + '/update_products/' + productDetails.product_detail_id, formData, 'PUT');
      if (supplierId != productDetails.supplier_id) productDetails.supplier_id = supplierId;
      toastShow('success', 'Updated Successfully');
      await mutate(API_ENDPOINTS.REQUISITION_BY_ID(requisitionID));
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e?.message || 'Could not update product');
    }
  };
  const pricingForm = [
    {
      label: 'Status',
      input_type: 'toggle',
      className: '',
      labelClassName: '',
      name: 'status',
      checked: formState.status,
      action: () => {
        setFormState((s) => ({...s, status: !formState.status}));
        productDetails.status = !productDetails.status;
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
        productDetails.price = e.target.value;
      },
    },
      {
        label: 'Currency',
        required: true,
        disabled: true,
        name: 'currency',
        value: formState.currency || '',
        className: '',
        action: (e) => {
          setFormState((s) => ({...s, currency: e.target.value}));
          productDetails.currency = e.target.value;
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
        options: Object.values(quantityType).map((q: any) => ({code: q, name: q.toUpperCase()})),
        action: (e) => {
          setFormState((s) => ({...s, quantity_type: e.target.value}));
          productDetails.quantity_type = e.target.value;
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
        productDetails.quantity = e.target.value;
      },
    },
      {
        label: 'Quantity Type',
        required: true,
        name: 'quantity_type',
        value: formState.quantity_type || '',
        // input_type: 'select',
        className: '',
        disabled: true,
        // options: Object.values(quantityType).map((q) => ({code: q, name: q.toUpperCase()})),
        action: (e) => {
          setFormState((s) => ({...s, quantity_type: e.target.value}));
          productDetails.quantity_type = e.target.value;
        }
      },
      {
        label: 'Total Price',
        name: 'total_price',
        value: clsx(formatCurrencyValue((formState.price * formState.quantity) || 0), formState.currency),
        disabled: true,
      }], {
      label: 'Expired On',
      placeholder: 'Expired On',
      value: formState.expired_date,
      name: 'expired_date',
      type: 'date',
      input_type: 'text',
      className: '',
      action: (e) => {
        setFormState((s) => ({...s, expired_date: e.target.value}));
        productDetails.expired_date = e.target.value;
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
        productDetails.note = e.target.value;
      },
    },
    {
      input_type: 'button',
      className: '',
      type: 'submit',
      placeholder: loading ? 'Loading...' : formState.currency == currency ? 'Update' : clsx('Convert To ', currency),
      disabled: loading
    }
  ];

  const convertedPrice=async (price)=>{
    setFormState((s) => ({
      ...s,
      price,
      currency,
    }));
    productDetails.price = price;
    productDetails.currency = currency;
  };
  const updateForm = (supplier) => {
    setSupplierId(supplier.id);
    if (supplier.id == productDetails.supplier_id) {
      setFormState({...initial});
      productDetails.supplier_name = supplier.shop_name || productDetails.supplier_name;
      return;
    }
    productDetails.supplier_name = supplier.shop_name || productDetails.supplier_name;
    setFormState((s) => ({...s, ...supplier, quantity: 0}));
  };

  if (isArchived) {
    return (
      <Card className={'flex flex-col gap-4 rounded-[22px] border border-slate-200/90 bg-white p-4'}>
        <div className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Requisition item</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Archived requisition</p>
          </div>
          <Badge variant="secondary" size="small">View only</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <ReadOnlyField label="Supplier" value={productDetails.supplier_name || (productDetails.supplier_id ? 'Supplier selected' : 'Not selected')} />
          <ReadOnlyField label="Status" value={productDetails.status ? 'Found' : 'Not found'} />
          <ReadOnlyField label="Price" value={formState.price ? `${formatCurrencyValue(formState.price)} ${formState.currency || ''}` : 'Not set'} />
          <ReadOnlyField label="Total price" value={formState.price && formState.quantity ? `${formatCurrencyValue(formState.price * formState.quantity)} ${formState.currency || ''}` : 'Not set'} />
          <ReadOnlyField label="Quantity" value={formState.quantity ? `${formState.quantity} ${formState.quantity_type || 'units'}` : 'Not set'} />
          <ReadOnlyField label="Expired on" value={formState.expired_date || 'Not set'} />
        </div>
        <ReadOnlyField label="Note" value={formState.note || 'No note'} className="min-h-[88px]" />
      </Card>
    );
  }

  return (
    <Card className={'flex flex-col gap-4 rounded-[22px] border border-slate-200/90 bg-white p-4 lg:flex-row'}>
      <SuppliersSection
        action={updateForm}
        productId={productDetails.product_detail_id}
        supplierId={supplierId}
        currentSupplier={productDetails.supplier_id ? {
          id: productDetails.supplier_id,
          shop_name: productDetails.supplier_name,
        } : null}
    />
      <div className="flex grow flex-col rounded-[18px] border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex justify-end">
          {productDetails.status ? <Badge variant={'success'}>Found Status</Badge> :
            <Badge variant={'danger'}> Not Found</Badge>}
        </div>
        {error ? (
          <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
        <Form
          handleSubmit={handleSubmit}
          fields={pricingForm}
        />
      </div>
      <SwitchCurrency
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        currencies={currencies}
        productCurrency={formState.currency}
        requisitionCurrency={currency}
        priceToConvert={formState.price}
        convertFunc={convertedPrice}
      />
    </Card>
  );
}

function ReadOnlyField({label, value, className = ''}) {
  return (
    <div className={clsx('rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2.5', className)}>
      <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
