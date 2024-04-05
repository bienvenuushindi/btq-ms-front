import Form from '@/components/Form';
import React, {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import {delay} from '@/lib/async';

export default function ConvertCurrency({
                                          setIsOpen,
                                          productCurrency,
                                          requisitionCurrency,
                                          priceToConvert,
                                          convertFunc
                                        }) {
  const [exchange, setExchange] = useState({
    valueToConvert: 1,
    output: 1,
    converted: null,
  });

  const convert = useCallback(() => {
    return (priceToConvert * (exchange.output / exchange.valueToConvert)).toFixed(2);
  }, [exchange.output, exchange.valueToConvert, priceToConvert]);

  useEffect(() => {
    setExchange((s) => ({...s, converted: convert()}));
  }, [exchange.valueToConvert, exchange.output, convert]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    await delay(2000);
    convertFunc(exchange.converted);
  };

  const forms = [
    [{
      label: clsx('Exchange', '(', productCurrency, ')'),
      placeholder: 'Add Exchange',
      required: true,
      value: exchange.valueToConvert,
      name: 'prod-ratio',
      type: 'number',
      action: (e) => {
        const newValue = e.target.value;
        setExchange((s) => ({...s, valueToConvert: newValue}));
      }
    },
      {
        label: clsx('Exchange', '(', requisitionCurrency, ')'),
        placeholder: 'Add Exchange',
        required: true,
        type: 'number',
        value: exchange.output,
        name: 'req-ratio',
        action: (e) => {
          setExchange((s) => ({...s, output: e.target.value}));
        }
      },
    ],
    [{
      label: clsx('Convert', '(', productCurrency, ')'),
      placeholder: 'Add Exchange',
      input_type: 'number',
      required: true,
      disabled: true,
      value: clsx(priceToConvert, productCurrency.toUpperCase()),
      name: 'prod-ratio',
      className: 'bg-gray-900 text-neutral-50',
    },
      {
        label: clsx('To', '(', requisitionCurrency, ')'),
        placeholder: 'Add Exchange',
        required: true,
        disabled: true,
        className: 'bg-gray-900 text-neutral-50',
        value: (exchange.valueToConvert > 0) ? clsx(exchange.converted, requisitionCurrency.toUpperCase()) : 0,
        name: 'req-ratio',
      },
    ],
    {
      input_type: 'button',
      className: clsx('w-full mt-4 ', (exchange.converted == null || exchange.converted <=0 ) && 'hidden'),
      type: 'button',
      placeholder: loading ? 'Processing...' : 'Convert',
      disabled: loading,
      action: async (e) => {
        await handleSubmit(e);
        setIsOpen(false);
      }
    }
  ];
  return (

    <Form
      fields={forms}
      // handleSubmit={handleSubmit}
    />

  );
}