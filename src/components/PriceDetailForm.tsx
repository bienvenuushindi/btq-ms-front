import React, { useState } from 'react';
import { API_ENDPOINTS, send } from '@/lib/api';
import {useRouter} from 'next/navigation';
import Form from '@/components/forms/Form';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import SelectSupplier from '@/components/requisitions/SelectSupplier';
import clsx from 'clsx';
import Toggle from '@/components/forms/Toggle';
import toastShow from '@/components/toast/toast-selector';
import {SupplierInformation} from '@/components/suppliers/SupplierInformation';
import {getImageUrls} from '@/lib/helper';
import {revalidateCache} from '@/lib/cache';

const buildInitialPrices = (initialDetails = []) =>
  initialDetails.reduce((acc, detail) => {
    acc[detail.quantity_type] = detail.price;
    return acc;
  }, {});

export const PriceDetailForm = ({
  productDetailID,
  onSuccess = null,
  initialSupplier = null,
  initialDetails = [],
}) => {
  const router = useRouter();
  const sizes = [
    { code: 'box', name: 'Box' },
    { code: 'dozen', name: 'Group' },
    { code: 'unit', name: 'Unit' },
  ];

  const initialPrices = buildInitialPrices(initialDetails);

  const initialFormState = {
    prices: initialPrices,
    supplier_id: initialSupplier?.id || null,
    product_detail_id: productDetailID,
    currency: initialDetails[0]?.currency || 'usd',
  };

  const [formState, setFormState] = useState({ ...initialFormState });
  const [error, setError] = useState('');
  const [activeSizes, setActiveSizes] = useState(
    sizes.map((size) => Boolean(initialPrices[size.code]))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append non-price fields
    Object.keys(formState).forEach((key) => {
      if (key !== 'prices') {
        formData.append(`price_detail[${key}]`, formState[key]);
      }
    });

    // Append prices
    const { prices } = formState;
    Object.keys(prices).forEach((sizeCode) => {
      formData.append(`price_detail[prices][${sizeCode}]`, prices[sizeCode]);
    });

    try {
      await send(`/product_details/${productDetailID}/price_details`, formData);
      await revalidateCache({
        keys: [
          API_ENDPOINTS.PRICE_DETAILS(productDetailID),
          API_ENDPOINTS.PRODUCT_DETAIL_SUPPLIERS(productDetailID),
        ],
        prefixes: [API_ENDPOINTS.PRODUCTS],
      });
      setError('');
      toastShow('success', initialSupplier ? 'Supplier pricing updated successfully' : 'Supplier pricing saved successfully');
      if (!initialSupplier) {
        setFormState({ ...initialFormState, prices: {}, supplier_id: null, currency: 'usd' });
        setActiveSizes([false, false, false]);
      }
      if (onSuccess) {
        await Promise.resolve(onSuccess());
      } else {
        router.refresh();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not save supplier pricing');
    }
  };

  const selectSupplier = (supplier) => {
    setFormState((prevState) => ({ ...prevState, supplier_id: supplier.id }));
  };

  const handleToggle = (index) => {
    const isTurningOff = activeSizes[index];
    setActiveSizes((prevSizes) => prevSizes.map((prevSize, i) => i === index ? !prevSize : prevSize));

    if (isTurningOff) {
      setFormState((prevState) => {
        const { [sizes[index].code]: omittedSize, ...restPrices } = prevState.prices as Record<string, string>;
        return {
          ...prevState,
          prices: restPrices,
        };
      });
    }
  };

  const content = {
    header: initialSupplier ? 'Edit Price' : 'Add Price',
    subheader: '',
    buttonText: initialSupplier ? 'Save Changes' : 'Create',
  };

  const forms = [
    {
      label: 'Select Supplier',
      input_type: 'custom',
      component: initialSupplier ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <SupplierInformation
            shopName={initialSupplier.shop_name}
            address1={initialSupplier.address?.address1}
            city={initialSupplier.address?.city}
            country={initialSupplier.address?.country}
            address2={initialSupplier.address?.address2}
            tel1={initialSupplier.address?.tel1}
            tel2={initialSupplier.address?.tel2}
            imageUrl={getImageUrls(initialSupplier.image_urls || [])[0]}
          />
        </div>
      ) : (
        <SelectSupplier action={selectSupplier} productId={productDetailID} supplierId={null} />
      ),
    },
    {
      label: 'Choose Currency',
      placeholder: 'Select Currency',
      name: 'currency',
      input_type: 'radio',
      value: formState.currency,
      className: '',
      options: ['fc', 'ugx', 'usd'],
      action: (e) => setFormState((prevState) => ({ ...prevState, currency: e.target.value })),
    },
    sizes.map((size, index) =>[
        {
        label: <Toggle enabled={activeSizes[index]} setEnabled={()=>handleToggle(index)} label={size.name}/>,
        placeholder: `${size.name} Price`,
        name: `${size.code}_price`,
        type: 'number',
        value: formState.prices[`${size.code}`],
        className: clsx(activeSizes[index] || 'hidden'),
        // labelClassName: clsx(activeSizes[index] || 'hidden'),
        action: (e) => {
          setFormState((prevState) => ({
            ...prevState,
            prices: {
              ...prevState.prices,
              [size.code]: e.target.value,
            },
          }));
        },
      }]
    ),
    {
      input_type: 'button',
      className: 'w-full justify-center',
      type: 'submit',
      placeholder: 'Save pricing',
    },
  ];

  return (
    <ContainerOne>
      <div className="w-full">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Pricing</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-slate-900">{content.header}</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-500">
            {initialSupplier
              ? 'Adjust the currency or pack prices for this supplier and save your changes.'
              : 'Assign a supplier, set the currency, and activate the pack sizes that should have pricing.'}
          </p>
        </div>
        <div className="oasis-panel p-6 lg:p-8">
          {error ? (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          ) : null}
          <Form handleSubmit={handleSubmit} fields={forms} />
        </div>
      </div>
    </ContainerOne>
  );
};
