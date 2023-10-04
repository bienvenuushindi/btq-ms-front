import React, {useEffect} from 'react';
import {RadioGroup} from '@headlessui/react';
import {CheckCircle} from 'react-feather';
import SelectSupplierLoader from '@/components/banners/SelectSupplierLoader';

function SupplierList({isLoading, suppliers, selected, onUpdateSelected, title}) {
  const isNestedAttributes = suppliers.length > 0 && suppliers[0].attributes;
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium my-2">{title}</h2>
      {isLoading ? (
        <SelectSupplierLoader />
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
                    className={({active, checked}) =>
                      `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : ''}
                         ${checked ? 'bg-lightBlue-100  text-white' : 'bg-white'}
                          relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none focus:border-none border`
                    }
                  >
                    {({active, checked}) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900 font-extrabold'
                                }`}
                              >
                                {isNestedAttributes
                                  ? supplier.attributes.shop_name
                                  : supplier.shop_name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <div className='flex flex-col'>
                                  <h6 className={`${
                                    checked ? 'text-sky-100' : 'text-gray-700'
                                  }`}>Address:</h6>
                                  <div className={`${
                                    checked ? 'text-sky-100' : 'text-gray-800'
                                  }`}>
                               {isNestedAttributes
                                 ? (supplier.attributes.country || 'Country') + '/ ' + (supplier.attributes.city || 'City')
                                 : (supplier.country || 'Country') + '/ ' + (supplier.city || 'City')}
                            </div>
                                  <ul className="">
                                    <li className='list-tem ml-2'>  <span className={`${
                                      checked ? 'text-sky-100' : 'text-gray-700'
                                    }`}>1. {isNestedAttributes ? (supplier.attributes.address1 || 'Address')
                                      : supplier.address1 || 'Address'}</span>
                                    </li>
                                    {
                                      (isNestedAttributes ? supplier.attributes.address2 : supplier.address2)  && (
                                      <li className='list-tem ml-2'>  <span className={`${
                                        checked ? 'text-sky-100' : 'text-gray-700'
                                      }`}>2. {isNestedAttributes ? (supplier.attributes.address2 || null)
                                        : supplier.address2 || null}</span>
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <div className='flex flex-col'>
                                  <h6 className={`${
                                    checked ? 'text-sky-100' : 'text-gray-700'
                                  }`}>Tel:</h6>
                                  <ul className="">
                                    <li className='list-item ml-2'> <span className={`${
                                      checked ? 'text-sky-100' : 'text-gray-700'
                                    }`}>{isNestedAttributes ? (supplier.attributes.tel1 || null)
                                      : (supplier.tel2 || null)}</span>
                                    </li>
                                    {
                                      (isNestedAttributes ? supplier.attributes.tel2 : supplier.tel2) && (
                                      <li className='list-item ml-2'> <span className={`${
                                        checked ? 'text-sky-100' : 'text-gray-700'
                                      }`}>{isNestedAttributes ? (supplier.attributes.tel2 || null)
                                        : (supplier.tel2 || null)}</span>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckCircle className="h-6 w-6" color="#ffffff"/>
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