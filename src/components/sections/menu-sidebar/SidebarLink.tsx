'use client';
import {useContext} from 'react';
import Link from 'next/link';
import {Settings, User, Grid, Book, BookOpen, Truck, Home} from 'react-feather';
import {usePathname} from 'next/navigation';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {sidebarInitial} from '@/components/sections/sidebar/PageContainer';
import {useRouter} from 'next/navigation';
import {useRouteTransition} from '@/components/navigation/RouteTransitionProvider';

const icons = {Settings, User, Grid, Book, BookOpen, Truck, Home};

function isFirstPartMatching(pathname, link) {
  // Split the pathname and link by '/'
  const pathnameParts = pathname.split('/');
  const linkParts = link.split('/');

  // Check if the first part of the pathname matches the link or if the link is "/"
  return pathnameParts[1] === linkParts[1] || linkParts[1] === '';
}


const SidebarLink = ({
  link,
  isCollapsed = false,
  onNavigate
}: {
  link: any,
  isCollapsed?: boolean,
  onNavigate?: () => void
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const {startNavigation} = useRouteTransition();
  const {openBar, setOpenBar} = useContext(SidebarContext);
  let isActive = false;

  if (isFirstPartMatching(pathname,link.link)) {
    isActive = true;
  }


  const onClick = async (event) => {
    event.preventDefault();
    if (openBar.state) setOpenBar({...sidebarInitial});
    onNavigate?.();
    startNavigation(`Opening ${link.label}...`);
    router.push(link.link);
  };

  const Icon = icons[link.icon];
  return (
    <li>
      <Link href={link.link}
            className={`group my-2 flex w-full items-center rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white shadow-[0_14px_24px_rgba(255,122,53,0.28)]'
                : 'text-slate-300 hover:bg-white/8 hover:text-white'
            }`}
            onClick={onClick}>
        <div
          className={`rounded-xl ${isActive ? 'bg-white/16' : 'bg-white/8'} p-2 font-bold ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
          <Icon
            size={18}
            color="#f8fafc"
          />
        </div>
        {!isCollapsed && (
          <span className="flex-grow text-base font-semibold text-white">
            {link.label}
          </span>
        )}
      </Link>
    </li>

  );
};
export default SidebarLink;
