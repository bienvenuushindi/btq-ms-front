'use client'
import {createContext, useContext, useEffect, useState} from 'react';
import {ArrowLeftCircle} from 'react-feather';
import clsx from 'clsx';
import Button from '@/components/utils/Button';

export const SidebarContext = createContext(null);

export const SidebarContainer = ({title, children}:any) => {
  const {openBar, setOpenBar, setSidebarData} = useContext(SidebarContext);
  const [maxHeight, setMaxHeight] =  useState(0);
    // Calculate the maximum height of the overlay
    useEffect(()=>{
       if(typeof window !== 'undefined') setMaxHeight(Math.max(window.innerHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight))
    }, [])

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSidebarData({});
          setOpenBar((prev) => ({...prev, state: false}));
        }}
        tabIndex={-1}
        className={clsx('bg-[rgba(0,0,0,.4)] flex justify-center items-center fixed top-0 left-0  h-screen w-full', !openBar.state && 'hidden')}
        style={{height: `${maxHeight}px`}} // Set the height dynamically
      ></div>

      <div
        className={clsx('fixed top-0 right-0 bottom-0 z-50 w-full border-gray-700 bg-white shadow lg:w-[400px] ease-in-out delay-150 duration-300', openBar.state ? 'translate-x-0' : 'translate-x-full')}
        style={{height: '100%'}}
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
            {openBar.state && children}
          </div>
        </div>
      </div>
    </>
  );
};
