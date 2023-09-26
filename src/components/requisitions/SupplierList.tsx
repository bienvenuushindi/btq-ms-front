import React, {useEffect} from 'react';
import {RadioGroup} from '@headlessui/react';
import {CheckCircle} from 'react-feather';

function SupplierList({isLoading, suppliers, selected, onUpdateSelected, title}) {
  const isNestedAttributes = suppliers.length > 0 && suppliers[0].attributes;

  return (
    <div className="w-full">
      <h2 className="text-lg font-medium my-2">{title}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <RadioGroup value={selected} onChange={onUpdateSelected}>
          <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
          <div className="w-full flex justify-start flex-col items-start">
            <div className="w-full">
              <div className="space-y-2">
                {suppliers.map((supplier) => (
                  <RadioGroup.Option
                    key={isNestedAttributes ? supplier.attributes.id : supplier.id}
                    value={isNestedAttributes ? supplier.attributes.id : supplier.id}
                    className={({ active, checked }) =>
                      `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
                         ${checked ? 'bg-lightBlue-100  text-white' : 'bg-white'}
                          relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none focus:border-none border`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {isNestedAttributes
                                  ? supplier.attributes.shop_name
                                  : supplier.shop_name}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckCircle className="h-6 w-6" color="#ffffff" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </div>
          </div>
        </RadioGroup>
      )}
    </div>
  );
}

export default SupplierList;