'use client';

import clsx from 'clsx';
import {Book, BookOpen, Home, MoreHorizontal, Truck} from 'react-feather';
import {usePathname, useRouter} from 'next/navigation';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

const items = [
  {label: 'Dashboard', href: '/home', icon: Home},
  {label: 'Products', href: '/products', icon: Book},
  {label: 'Requisitions', href: '/requisitions', icon: BookOpen},
  {label: 'Suppliers', href: '/suppliers', icon: Truck},
];

function isActive(pathname: string, href: string) {
  const current = pathname.split('/')[1] || 'home';
  const target = href.split('/')[1] || 'home';
  return current === target;
}

export default function MobileBottomNav({onMoreOpen}: {onMoreOpen: () => void}) {
  const pathname = usePathname();
  const router = useRouter();
  const {startNavigation} = useRouteTransition();

  const navigate = (href: string, label: string) => {
    startNavigation(`Opening ${label}...`);
    router.push(href);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_24px_rgba(15,23,42,0.06)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => navigate(item.href, item.label)}
              className={clsx(
                'flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[9px] font-semibold transition',
                active ? 'text-primary' : 'text-slate-500 hover:text-slate-800'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} strokeWidth={active ? 2.6 : 2}/>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onMoreOpen}
          className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[9px] font-semibold text-slate-500 transition hover:text-slate-800"
        >
          <MoreHorizontal size={16}/>
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
