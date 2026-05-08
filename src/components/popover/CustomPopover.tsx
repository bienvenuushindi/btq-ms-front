import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Popover, Portal, Transition } from '@headlessui/react';

const PopoverPanelContent = ({ open, panelStyle, panelRef, children }) => {
    return (
        <Portal>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel
                    static
                    ref={panelRef}
                    className="fixed z-[120] w-max min-w-[10rem] max-w-[calc(100vw-2rem)]"
                    style={panelStyle}
                >
                    {children}
                </Popover.Panel>
            </Transition>
        </Portal>
    );
};

const CustomPopover = ({ title, children }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [panelStyle, setPanelStyle] = useState({ top: 0, left: 0 });

    const updatePanelPosition = () => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;

        const panelWidth = panelRef.current?.offsetWidth || 160;
        const viewportPadding = 16;
        const left = Math.min(
            window.innerWidth - panelWidth - viewportPadding,
            Math.max(viewportPadding, rect.right - panelWidth)
        );

        setPanelStyle({
            top: rect.bottom + 8,
            left,
        });
    };

    return (
        <Popover className="relative">
            {({ open }) => (
                <PopoverPositionWatcher open={open} updatePanelPosition={updatePanelPosition}>
                    <Popover.Button
                        ref={buttonRef}
                        className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                    >
                        {title}
                    </Popover.Button>
                    <PopoverPanelContent open={open} panelStyle={panelStyle} panelRef={panelRef}>
                        {children}
                    </PopoverPanelContent>
                </PopoverPositionWatcher>
            )}
        </Popover>
    );
};

const PopoverPositionWatcher = ({ open, updatePanelPosition, children }) => {
    useEffect(() => {
        if (!open) return;

        updatePanelPosition();
        window.addEventListener('resize', updatePanelPosition);
        window.addEventListener('scroll', updatePanelPosition, true);

        return () => {
            window.removeEventListener('resize', updatePanelPosition);
            window.removeEventListener('scroll', updatePanelPosition, true);
        };
    }, [open, updatePanelPosition]);

    return <>{children}</>;
};

export default CustomPopover;
