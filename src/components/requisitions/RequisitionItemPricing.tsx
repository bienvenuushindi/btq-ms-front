'use client';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {useFetcher} from "@/app/hooks/useFetcher";
import {revalidateCache} from '@/lib/cache';
import {isPurchasedStatus} from '@/lib/helper';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';

const formatCurrencyValue = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return value;

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const hasValue = (value) => ![null, undefined, '', 'null'].includes(value);
const sameCurrency = (first, second) => first?.toString().toLowerCase() === second?.toString().toLowerCase();
const normalizeQuantityType = (value) => {
  const quantityTypesByIndex = {0: 'box', 1: 'dozen', 2: 'unit'};
  if (!hasValue(value)) return '';
  return quantityTypesByIndex[value] || value.toString().toLowerCase();
};
const sameQuantityType = (first, second) => normalizeQuantityType(first) === normalizeQuantityType(second);
export default function RequisitionItemPricing({productDetails}) {
  const {requisitionID, requisition} = useContext(RequisitionContext)
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const {data: quantityType = {}} = useFetcher(API_ENDPOINTS.QUANTITY_TYPES);
  const {currency} = useContext(RequisitionContext);
  const requisitionCurrency = currency || productDetails.currency || '';
  const isArchived = Boolean(requisition?.archived);
  const initial = {
    price: productDetails.price || 0,
    currency: requisitionCurrency,
    status: isPurchasedStatus(productDetails.status),
    quantity: productDetails.quantity || 0,
    quantity_type: productDetails.quantity_type,
    note: productDetails.note || '',
    expired_date: productDetails.expired_date || null,
  };
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({...initial});
  const [supplierId, setSupplierId] = useState(productDetails.supplier_id);
  const [selectedSupplierPricing, setSelectedSupplierPricing] = useState(null);
  const [error, setError] = useState('');
  const [blockedSupplier, setBlockedSupplier] = useState(null);
  const syncedCurrencyRef = useRef(null);
  const hasExpirationDate = Boolean(productDetails.product_expired_date);
  const quantityTypeOptions = Array.from(new Set([
    ...Object.values(quantityType).map((q: any) => normalizeQuantityType(q)),
    normalizeQuantityType(formState.quantity_type),
    normalizeQuantityType(selectedSupplierPricing?.quantity_type),
  ].filter(hasValue)));

  useEffect(() => {
    if (!hasValue(currency)) return;
    if (syncedCurrencyRef.current === currency) return;

    syncedCurrencyRef.current = currency;

    const nextState = {
      price: productDetails.price || 0,
      currency,
      status: isPurchasedStatus(productDetails.status),
      quantity: productDetails.quantity || 0,
      quantity_type: productDetails.quantity_type,
      note: productDetails.note || '',
      expired_date: productDetails.expired_date || null,
    };

    setFormState(nextState);
  }, [currency, productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!supplierId) {
      setError('Please select a supplier');
      return;
    }
    setLoading(true);
    await delay(2000);
    const formData = new FormData();
    const requisitionItemState = {...formState, currency: requisitionCurrency};
    Object.keys(requisitionItemState).forEach((key) => {
      if (key === 'expired_date' && !hasExpirationDate) return;
      if (['quantity_type', 'expired_date'].includes(key) && !hasValue(requisitionItemState[key])) return;
      formData.append(`requisition_product[${key}]`, requisitionItemState[key]);
    });
    formData.append('requisition_product[supplier_id]', supplierId);
    try {
      await send('/requisitions/' + requisitionID + '/update_products/' + productDetails.product_detail_id, formData, 'PUT');
      if (supplierId != productDetails.supplier_id) productDetails.supplier_id = supplierId;
      toastShow('success', 'Updated Successfully');
      await revalidateCache({
        keys: [
          API_ENDPOINTS.REQUISITION_BY_ID(requisitionID),
          API_ENDPOINTS.PRICE_DETAILS(productDetails.product_detail_id),
          API_ENDPOINTS.PRODUCT_DETAIL_SUPPLIERS(productDetails.product_detail_id),
        ],
        prefixes: [API_ENDPOINTS.REQUISITIONS, API_ENDPOINTS.RECENT_REQUISITIONS, API_ENDPOINTS.PRODUCTS],
      });
      setSidebarData({});
      setOpenBar((prev) => ({...prev, state: false}));
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e?.message || 'Could not update product');
    }
  };
  const pricingForm = [
    {
      label: 'Mark as Purchased',
      input_type: 'toggle',
      className: '',
      labelClassName: '',
      name: 'status',
      checked: formState.status,
      action: () => {
        const nextStatus = !formState.status;
        setFormState((s) => ({...s, status: nextStatus}));
        productDetails.status = nextStatus;
      }
    },
    [{
      label: "Today's Purchase Price",
      required: true,
      placeholder: "Today's purchase price",
      value: formState.price,
      name: 'price',
      type: 'number',
      input_type: 'text',
      className: '',
        action: (e) => {
          const nextState = {...formState, price: e.target.value};
          setError('');
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
        label: 'Buying Unit',
        required: true,
        placeholder: 'Choose buying unit',
        name: 'quantity_type',
        value: formState.quantity_type || '',
        input_type: 'select',
        className: '',
        options: quantityTypeOptions.map((q: any) => ({code: q, name: q.toUpperCase()})),
        action: (e) => {
          const nextQuantityType = e.target.value;
          const shouldUseSupplierPrice = selectedSupplierPricing
            && sameQuantityType(nextQuantityType, selectedSupplierPricing.quantity_type);
          const supplierPriceMatchesRequisition = shouldUseSupplierPrice
            && sameCurrency(selectedSupplierPricing.currency, requisitionCurrency);
          const shouldResetPrice = selectedSupplierPricing
            && hasValue(nextQuantityType)
            && hasValue(selectedSupplierPricing.quantity_type)
            && (!shouldUseSupplierPrice || !supplierPriceMatchesRequisition);
          const nextPrice = supplierPriceMatchesRequisition
            ? selectedSupplierPricing.price
            : shouldResetPrice ? '' : formState.price;
          const nextQuantity = shouldResetPrice ? '' : formState.quantity;
          const nextCurrency = requisitionCurrency;
          const nextState = {
            ...formState,
            quantity_type: nextQuantityType,
            price: nextPrice,
            quantity: nextQuantity,
            currency: nextCurrency,
          };
          setFormState(nextState);
          productDetails.quantity_type = nextQuantityType;
          productDetails.price = nextPrice;
          productDetails.quantity = nextQuantity;
          productDetails.currency = nextCurrency;
          setError('');
        }
      }],
    [{
      label: 'Quantity to Buy',
      required: true,
      placeholder: 'Quantity to buy',
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
        label: "Today's Purchase Total",
        name: 'total_price',
        value: clsx(formatCurrencyValue((formState.price * formState.quantity) || 0), formState.currency),
        disabled: true,
      }],
    ...(hasExpirationDate ? [{
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
    }] : []),
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
      placeholder: loading ? 'Loading...' : 'Update',
      disabled: loading
    }
  ];

  const updateForm = (supplier, options: any = {}) => {
    if (!supplier) return;

    const supplierPricing = supplier && hasValue(supplier.price) && hasValue(supplier.quantity_type)
      ? {
        supplier_id: supplier.id,
        price: supplier.price,
        currency: supplier.currency,
        quantity_type: normalizeQuantityType(supplier.quantity_type),
      }
      : null;

    if (supplierPricing && !sameCurrency(supplierPricing.currency, requisitionCurrency)) {
      if (!options?.silent) {
        setBlockedSupplier({
          name: supplier.shop_name,
          supplierCurrency: supplierPricing.currency,
          requisitionCurrency,
        });
      }

      return false;
    }

    setSelectedSupplierPricing(supplierPricing);
    setSupplierId(supplier.id);
    productDetails.supplier_name = supplier.shop_name || productDetails.supplier_name;

    if (supplierPricing) {
      const nextState = {
        ...formState,
        price: supplierPricing.price,
        currency: requisitionCurrency,
        quantity_type: supplierPricing.quantity_type,
        quantity: '',
      };
      setError('');
      setFormState(nextState);
      productDetails.price = supplierPricing.price;
      productDetails.currency = requisitionCurrency;
      productDetails.quantity_type = supplierPricing.quantity_type;
      productDetails.quantity = '';
      return true;
    }

    if (supplier.id == productDetails.supplier_id) {
      setFormState({...initial});
      return true;
    }
    setError('');
    setFormState((s) => ({...s, price: 0, quantity_type: '', quantity: 0, currency: requisitionCurrency}));
    productDetails.price = 0;
    productDetails.currency = requisitionCurrency;
    productDetails.quantity_type = '';
    productDetails.quantity = 0;
    return true;
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
          <ReadOnlyField label="Purchase status" value={isPurchasedStatus(productDetails.status) ? 'Purchased' : 'Not yet purchased'} />
          <ReadOnlyField label="Today's purchase price" value={formState.price ? `${formatCurrencyValue(formState.price)} ${formState.currency || ''}` : 'Not set'} />
          <ReadOnlyField label="Today's purchase total" value={formState.price && formState.quantity ? `${formatCurrencyValue(formState.price * formState.quantity)} ${formState.currency || ''}` : 'Not set'} />
          <ReadOnlyField label="Quantity to buy" value={formState.quantity ? `${formState.quantity} ${formState.quantity_type || 'units'}` : 'Not set'} />
          {hasExpirationDate ? <ReadOnlyField label="Expired on" value={formState.expired_date || 'Not set'} /> : null}
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
    />
      <div className="flex grow flex-col rounded-[18px] border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex justify-end">
          {isPurchasedStatus(productDetails.status) ? <Badge variant={'success'}>Purchased</Badge> :
            <Badge variant={'danger'}>Pending purchase</Badge>}
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
      <SupplierCurrencyMismatchModal
        blockedSupplier={blockedSupplier}
        closeModal={() => setBlockedSupplier(null)}
      />
    </Card>
  );
}

function SupplierCurrencyMismatchModal({blockedSupplier, closeModal}) {
  const isOpen = Boolean(blockedSupplier);

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={closeModal}>
      <ModalContent>
        <ModalHeader
          closeModal={closeModal}
          title="Supplier currency does not match"
          titleClassName="text-center px-2"
        />
        <ModalBody>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">
              {blockedSupplier?.name || 'This supplier'} uses {blockedSupplier?.supplierCurrency || 'another currency'}.
            </p>
            <p className="mt-2">
              This requisition uses {blockedSupplier?.requisitionCurrency || 'a different currency'}, so this supplier cannot be added here. Create another requisition with the supplier currency to proceed with this supplier.
            </p>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
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
