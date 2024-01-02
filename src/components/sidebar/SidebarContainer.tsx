'use client'
import {createContext, useContext} from 'react';
import {ArrowLeftCircle} from 'react-feather';
import clsx from 'clsx';
import Button from '@/components/Button';

export const SidebarContext = createContext(null);

export const SidebarContainer = ({title, children, footer}) => {
  const {openBar, setOpenBar, setSidebarData} = useContext(SidebarContext);
    // Calculate the maximum height of the overlay
    const maxHeight = typeof window !== 'undefined'
      ? Math.max(window.innerHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
      : 0;

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSidebarData({});
          setOpenBar((prev) => ({...prev, state: false}));
        }}
        tabIndex="-1"
        className={clsx('bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-full transition-all ', !openBar.state && 'hidden')}
        style={{height: `${maxHeight}px`}} // Set the height dynamically
      ></div>

      <div
        className={clsx('bg-white fixed top-0 right-0 bottom-0 border-gray-700   lg:w-100 lg:shadow z-50 transition-all duration-1000 ease-in-out', !openBar.state && 'hidden', openBar.state ? 'translate-x-0' : 'translate-x-full')}
        style={{height: '100%', minWidth: '400px'}}
      >
        <div className="shadow-sm p-1 gap-1  flex items-center">
          <Button size="small"
                  intent="secondary"
                  onClick={() => {
                    setSidebarData({});
                    setOpenBar((prev) => ({...prev, state: false}));
                  }}
                  className="flex items-center text-sm ">
            <ArrowLeftCircle size={20} className="font-extrabold"/>
            <span className="">Back </span>
            <span className="sr-only">Close menu</span>
          </Button>
          <h5 id="drawer-label"
              className=" text-base font-extrabold  dark:text-gray-400 border-l border-1 pl-1">
            {title || 'Details'}
          </h5>
        </div>
        <div className="pointer-events-auto">
          <div className="body relative h-[calc(100vh-10px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};