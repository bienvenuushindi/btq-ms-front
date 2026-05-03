'use client'
import {Bell, ChevronsLeft, ChevronsRight, Menu, RefreshCcw, Search, User} from 'react-feather';
// import {Avatar} from '@headlessui/react'; // You can use a suitable library for Avatar component
import { AccountPopover } from '@/components/AccountPopover';
import {usePopover} from '@/app/hooks/usePopover';
import clsx from 'clsx';
import {usePathname} from 'next/navigation';

const pageTitles: Record<string, string> = {
  home: 'Dashboard Overview',
  requisitions: 'Requisition Management',
  products: 'Product Catalog',
  suppliers: 'Supplier Accounts',
  categories: 'Analytics & Categories',
  account: 'Admin Profile',
  settings: 'Platform Settings'
};

const AppBar = (props) => {
  const { onNavOpen, onToggleSidebar, isSidebarCollapsed } = props;
  const accountPopover = usePopover();
  const pathname = usePathname();
  const pathKey = pathname.split('/')[1] || 'home';
  const title = pageTitles[pathKey] || 'OasisMarket';

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
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:px-7">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button onClick={onNavOpen} className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-primary/30 hover:bg-orange-50 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={onToggleSidebar}
                className="hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-primary/30 hover:bg-orange-50 lg:flex"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
              </button>
              <div className="min-w-0">
                <p className="truncate font-display text-[1.35rem] font-bold leading-tight text-slate-900 sm:text-[1.65rem] md:text-[2rem] lg:text-[2.25rem]">{title}</p>
              </div>
            </div>
            <div className="hidden flex-1 px-8 lg:block" />
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
              <button className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-amber-500 shadow-sm transition hover:bg-amber-50 sm:p-2.5">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-500 shadow-sm transition hover:bg-slate-100 sm:block sm:p-2.5">
                <RefreshCcw className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 text-sky-500 shadow-sm transition hover:bg-sky-50 sm:block sm:p-2.5">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(255,122,53,0.28)] sm:h-11 sm:w-11">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
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
