'use client';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {useState} from 'react';
export const sidebarInitial = {state: false, target: ''};
export default function PageContainer({children}) {
  const [openBar, setOpenBar] = useState({...sidebarInitial});
  const [sidebarData, setSidebarData] = useState({});
  return (
    <>
      <SidebarContext.Provider value={{openBar, setOpenBar, sidebarData, setSidebarData}}>
        {children}
      </SidebarContext.Provider>
    </>
  );
}