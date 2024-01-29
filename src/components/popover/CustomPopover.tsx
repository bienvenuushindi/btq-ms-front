import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';

const CustomPopover = ({ title, children }) => {
    const [popoverPosition, setPopoverPosition] = useState({top: 0, left: 0});
    const handleButtonActionsClick = (event) => {
        const button = event.currentTarget;
        const popoverWidth = 94;
        const popoverPosition = calculatePopoverPosition(button, popoverWidth);
        setPopoverPosition(popoverPosition);
    };
    const calculatePopoverPosition = (button, popoverWidth) => {
        const buttonRect = button.getBoundingClientRect();
        const spaceRight = window.innerWidth - buttonRect.right;
        const top = buttonRect.bottom + window.scrollY;
        let left = buttonRect.right + window.scrollX;
        if (spaceRight < popoverWidth) {
            left = buttonRect.left + window.scrollX - popoverWidth;
        }
        return {
            top,
            left,
        };
    };
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
                        <Popover.Panel className="absolute left-1/2  z-10 mt-3  max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                            {children}
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default CustomPopover;
