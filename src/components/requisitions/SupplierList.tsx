import React from 'react';
import {RadioGroup} from '@headlessui/react';
import {CheckCircle} from 'react-feather';
import SelectSupplierLoader from '@/components/banners/SelectSupplierLoader';

function SupplierList({isLoading, suppliers, selected, onUpdateSelected, title}) {
    return (
        <div className="w-full">
            {isLoading ? (
                <SelectSupplierLoader/>
            ) : (
                <>
                    <h5 className="my-2 text-sm font-semibold text-slate-700">{title}</h5>
                    {suppliers.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500">
                            No suppliers available for this search yet.
                        </div>
                    ) : (
                    <RadioGroup value={selected} onChange={onUpdateSelected}>
                        <RadioGroup.Label className="sr-only">{title}</RadioGroup.Label>
                        <div className="w-full flex justify-start flex-col items-start">
                            <div className="w-full">
                                <div className="space-y-2">
                                    {suppliers.map((supplier: { id: any; shop_name: any; address: any; }) => {
                                            const {
                                                id,
                                                shop_name,
                                                address: supplierAddress,
                                            } = supplier;

                                            const {
                                                city,
                                                country,
                                                address1,
                                                address2,
                                                tel1,
                                                tel2
                                            } = supplierAddress
                                            return (
                                                <RadioGroup.Option
                                                    key={id}
                                                    value={id}
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
                                                                            {shop_name}
                                                                        </RadioGroup.Label>
                                                                        <RadioGroup.Description
                                                                            as="span"
                                                                            className={`inline ${
                                                                                checked ? 'text-sky-100' : 'text-gray-500'
                                                                            }`}
                                                                        >
                                                                            <div className="flex flex-col">
                                                                                <h6 className={`${
                                                                                    checked ? 'text-sky-100' : 'text-gray-700'
                                                                                }`}>Address:</h6>
                                                                                <div className={`${
                                                                                    checked ? 'text-sky-100' : 'text-gray-800'
                                                                                }`}>
                                                                                    {(country || 'Country') + '/ ' + (city || 'City')}
                                                                                </div>
                                                                                <ul className="">
                                                                                    <li className="list-tem ml-2">  <span
                                                                                        className={`${
                                                                                            checked ? 'text-sky-100' : 'text-gray-700'
                                                                                        }`}>1. {address1 || 'Address'}</span>
                                                                                    </li>
                                                                                    {
                                                                                        address2 && (
                                                                                            <li className="list-tem ml-2">  <span
                                                                                                className={`${
                                                                                                    checked ? 'text-sky-100' : 'text-gray-700'
                                                                                                }`}>2. {address2 || null}</span>
                                                                                            </li>
                                                                                        )}
                                                                                </ul>
                                                                            </div>

                                                                            <div className="flex ">
                                                                                <h6 className={`${
                                                                                    checked ? 'text-sky-100' : 'text-gray-700'
                                                                                }`}>Tel:</h6>
                                                                                <div>
                                                                                    <ul className="">
                                                                                        <li className="list-item ml-2"> <span
                                                                                            className={`${
                                                                                                checked ? 'text-sky-100' : 'text-gray-700'
                                                                                            }`}>{tel1 || null}</span>
                                                                                        </li>
                                                                                        {
                                                                                            (tel2) && (
                                                                                                <li className="list-item ml-2"> <span
                                                                                                    className={`${
                                                                                                        checked ? 'text-sky-100' : 'text-gray-700'
                                                                                                    }`}>{tel2 || null}</span>
                                                                                                </li>
                                                                                            )}
                                                                                    </ul>
                                                                                </div>
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
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </RadioGroup>
                    )}
                </>
            )}
        </div>
    );
}

export default SupplierList;
