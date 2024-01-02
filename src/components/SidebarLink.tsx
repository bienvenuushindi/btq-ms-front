'use client';
import {useContext} from 'react';
import Link from 'next/link';
import {Settings, User, Grid, Book, BookOpen, Truck, Home} from 'react-feather';
import {usePathname} from 'next/navigation';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import {sidebarInitial} from '@/components/PageContainer';
import {useRouter} from 'next/navigation';

const icons = {Settings, User, Grid, Book, BookOpen, Truck, Home};

function isFirstPartMatching(pathname, link) {
  // Split the pathname and link by '/'
  const pathnameParts = pathname.split('/');
  const linkParts = link.split('/');

  // Check if the first part of the pathname matches the link or if the link is "/"
  return pathnameParts[1] === linkParts[1] || linkParts[1] === '';
}


const SidebarLink = ({link}) => {
  const pathname = usePathname();
  const router = useRouter();
  const {openBar, setOpenBar} = useContext(SidebarContext);
  let isActive = false;

  if (isFirstPartMatching(pathname,link.link)) {
    isActive = true;
  }


  const onClick = async (event) => {
    event.preventDefault();
    if (openBar.state) setOpenBar({...sidebarInitial});
    router.push(link.link);
  };

  const Icon = icons[link.icon];
  return (
    <li>
      <Link href={link.link}
            className={`flex items-center  ${isActive ? 'bg-lightBlue-100' : 'hover:bg-white-4'} px-2 py-2 my-3 text-left w-full`}
            onClick={onClick}>
        <div
          className={`mr-2 font-bold`}>
          <Icon
            size={20}
            color={'#FFFFFF'}
          />
        </div>
        <span
          className={`flex-grow font-semibold text-white ${isActive ? 'text-white' : ''} ${isActive ? 'text-neutral-100' : ''}`}>{link.label}</span>
      </Link>
    </li>

  );
};
export default SidebarLink;