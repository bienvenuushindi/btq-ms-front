import React, { useState } from 'react';
import { send } from '@/lib/api';
import Form from '@/components/Form';
import ContainerOne from '@/components/ContainerOne';
import SelectSupplier from '@/components/requisitions/SelectSupplier';
import clsx from 'clsx';
import Toggle from '@/components/forms/Toggle';

export const PriceDetailForm = ({ productDetailID }) => {
  const sizes = [
    { code: 'box', name: 'Box' },
    { code: 'dozen', name: 'Dozen' },
    { code: 'unit', name: 'Unit' },
  ];

  const initialFormState = {
    prices: {},
    supplier_id: null,
    product_detail_id: productDetailID,
    currency: 'usd',
  };

  const [formState, setFormState] = useState({ ...initialFormState });
  const [, setError] = useState('');
  const [activeSizes, setActiveSizes] = useState([false, false, false]);

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
      // setOpenBar({ state: true, target: 'price_details' });
    } catch (error) {
      setError('Could not create product');
    } finally {
      setFormState({ ...initialFormState });
    }
  };

  const selectSupplier = (supplier) => {
    setFormState((prevState) => ({ ...prevState, supplier_id: supplier.id }));
  };

  const handleToggle = (index) => {
    setActiveSizes((prevSizes) => prevSizes.map((prevSize, i) => i === index ? !prevSize : prevSize));

    // If toggling off, remove size.code from prices
    if (!activeSizes[index]) {
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
    header: 'Add Price',
    subheader: '',
    buttonText: 'Create',
  };

  const forms = [
    {
      label: 'Select Supplier',
      input_type: 'custom',
      component: <SelectSupplier action={selectSupplier} productId={productDetailID} supplierId={null} />,
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
      // {
      //   label: size.name,
      //   input_type: 'toggle',
      //   name: 'found',
      //   checked: activeSizes[index],
      //   action: () => handleToggle(index),
      // },
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
      className: '',
      type: 'submit',
      placeholder: content.buttonText,
    },
  ];

  return (
    <ContainerOne>
      <div className="w-full">
        <Form handleSubmit={handleSubmit} fields={forms} />
      </div>
    </ContainerOne>
  );
};
