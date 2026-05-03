import Button from '@/components/utils/Button';
import React from 'react';
import clsx from 'clsx';
export default function ModalHeader({title, closeModal, titleClassName}:{title: any, closeModal: any, titleClassName?: any}) {
  return (
    <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
      <h3 className={clsx("font-display text-3xl font-bold text-slate-900",titleClassName)}>
        {title}
      </h3>
      <Button size="small" intent="text" onClick={closeModal} type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-primary"
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
