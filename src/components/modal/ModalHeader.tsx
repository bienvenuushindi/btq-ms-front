import Button from '@/components/utils/Button';
import React from 'react';
import clsx from 'clsx';
export default function ModalHeader({title, closeModal, titleClassName}:{title: any, closeModal: any, titleClassName?: any}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-6 sm:py-5">
      <h3 className={clsx("min-w-0 break-words font-display text-xl font-bold text-slate-900 sm:text-3xl",titleClassName)}>
        {title}
      </h3>
      <Button size="small" intent="text" onClick={closeModal} type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-primary sm:h-10 sm:w-10 sm:rounded-2xl"
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
