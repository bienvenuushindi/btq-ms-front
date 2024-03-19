import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';

const CustomPopover = ({ title, children }) => {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    >
                        {title}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute left-14  z-10  max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                            {children}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default CustomPopover;
