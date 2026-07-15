// DeleteAlert.js

import React from 'react';
import Button from '@/components/utils/Button';

const DeleteAlert = ({onCancel, onDelete, show, message}) => {
    return (
        <div
            className={`fixed bg-[rgba(0,0,0,.4)]  inset-0 flex items-center justify-center z-50 ${show ? 'visible' : 'hidden'}`}>
            <Button intent="default" className="fixed inset-0 bg-gray-700 opacity-50" onClick={onCancel}></Button>
            <div className="relative max-h-full w-[calc(100vw-1.5rem)] max-w-md">
                <div className="relative rounded-2xl bg-white shadow dark:bg-gray-700">
                    <Button size="small" intent="text" onClick={onCancel}
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </Button>
                    <div className="p-4 text-center sm:p-6">
                        <svg className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-200 sm:mb-4 sm:h-12 sm:w-12" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-4 break-words text-sm font-normal text-gray-500 dark:text-gray-400 sm:mb-5 sm:text-lg">{message || "Are you sure you want to remove this?"}</h3>
                        <Button onClick={onDelete} intent="danger" data-modal-hide="popup-modal"
                                className="mb-2 mr-0 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-center text-sm font-medium text-white sm:mb-0 sm:mr-2 sm:w-auto sm:px-5 sm:py-2.5">
                            Yes, I am sure
                        </Button>
                        <Button onClick={onCancel} intent="text" data-modal-hide="popup-modal"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-auto sm:px-5 sm:py-2.5 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600">No,
                            cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAlert;
