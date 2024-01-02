import Button from '@/components/Button';
import {X} from 'react-feather'
import React from 'react';
import clsx from 'clsx';
export default function ModalHeader({title, closeModal, titleClassName}) {
  return (
    <div className="flex items-start justify-between p-4 border-b rounded-t -dark:border-gray-600">
      <h3 className={clsx("text-xl font-semibold text-gray-900 ",titleClassName)}>
        {title}
      </h3>
      <Button size="small" intent="text" onClick={closeModal} type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close modal</span>
      </Button>
    </div>
  );
}