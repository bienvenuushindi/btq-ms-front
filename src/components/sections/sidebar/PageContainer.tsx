'use client';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {useEffect, useState} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
export const sidebarInitial = {state: false, target: '', panelClassName: ''};
export default function PageContainer({children}:any) {
  const [openBar, setOpenBar] = useState({...sidebarInitial});
  const [sidebarData, setSidebarData] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setOpenBar({...sidebarInitial});
    setSidebarData({});
  }, [pathname, searchParams]);

  return (
    <>
      <SidebarContext.Provider value={{openBar, setOpenBar, sidebarData, setSidebarData}}>
        {children}
      </SidebarContext.Provider>
    </>
  );
}
