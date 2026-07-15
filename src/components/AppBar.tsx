'use client'
import {Bell, ChevronsLeft, ChevronsRight, Menu, RefreshCcw, Search, User} from 'react-feather';
// import {Avatar} from '@headlessui/react'; // You can use a suitable library for Avatar component
import { AccountPopover } from '@/components/AccountPopover';
import {usePopover} from '@/app/hooks/usePopover';
import clsx from 'clsx';
import {usePathname} from 'next/navigation';
import {BRAND_NAME} from '@/lib/brand';

const pageTitles: Record<string, { mobile: string; desktop: string }> = {
  home: { mobile: 'Dashboard', desktop: 'Dashboard Overview' },
  requisitions: { mobile: 'Requisitions', desktop: 'Requisition Management' },
  products: { mobile: 'Products', desktop: 'Product Catalog' },
  suppliers: { mobile: 'Suppliers', desktop: 'Supplier Accounts' },
  categories: { mobile: 'Categories', desktop: 'Analytics & Categories' },
  account: { mobile: 'Account', desktop: 'Admin Profile' },
  settings: { mobile: 'Settings', desktop: 'Platform Settings' }
};

const AppBar = (props) => {
  const { onNavOpen, onToggleSidebar, isSidebarCollapsed } = props;
  const accountPopover = usePopover();
  const pathname = usePathname();
  const pathKey = pathname.split('/')[1] || 'home';
  const titles = pageTitles[pathKey] || { mobile: BRAND_NAME, desktop: BRAND_NAME };

  return (
    <>
        <header
          className={clsx(
            "fixed left-0 top-0 z-40 w-full border-b border-slate-200/80 bg-white text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-[left,width] duration-300",
            isSidebarCollapsed
              ? "lg:left-24 lg:w-[calc(100%-6rem)]"
              : "lg:left-64 lg:w-[calc(100%-16rem)]"
          )}
        >
          <div className="grid h-14 grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center gap-2 px-4 lg:flex lg:h-auto lg:justify-between lg:gap-3 lg:px-7 lg:py-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button onClick={onNavOpen} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 transition hover:bg-slate-50 lg:hidden">
                <Menu className="h-4 w-4" />
              </button>
              <button
                onClick={onToggleSidebar}
                className="hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-primary/30 hover:bg-orange-50 lg:flex"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
              </button>
              <div className="hidden min-w-0 lg:block">
                <p className="truncate font-display text-[2.25rem] font-bold leading-tight text-slate-900">{titles.desktop}</p>
              </div>
            </div>
            <p className="min-w-0 truncate text-center text-[13px] font-bold leading-none text-slate-950 lg:hidden">{titles.mobile}</p>
            <div className="hidden flex-1 px-8 lg:block" />
            <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 transition hover:bg-slate-50 lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-slate-50 lg:p-2 lg:text-amber-500 lg:shadow-sm lg:hover:bg-amber-50">
                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
              <button className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-slate-500 shadow-sm transition hover:bg-slate-100 lg:block">
                <RefreshCcw className="h-5 w-5" />
              </button>
              <button className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-sky-500 shadow-sm transition hover:bg-sky-50 lg:block">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(255,122,53,0.28)] lg:flex">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
          <AccountPopover
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
        </header>

    </>
  );
};


export default AppBar;
