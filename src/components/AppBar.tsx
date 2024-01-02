'use client'
import {Menu, Search, User, Bell, Tag, Users} from 'react-feather';
// import {Avatar} from '@headlessui/react'; // You can use a suitable library for Avatar component
import { AccountPopover } from '@/components/AccountPopover';
import {usePopover} from '@/app/hooks/usePopover';
import {useState} from 'react';

const SIDE_NAV_WIDTH = 280;

const AppBar = (props) => {
  const { onNavOpen } = props;
  const [lgUp, setLgUp] = useState(false); // Using state to simulate useMediaQuery
  const accountPopover = usePopover();

  return (
    <>
        <header
          className="fixed  h-12 bg-opacity-80 backdrop-blur-sm top-0 fixed left-0 w-full"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            // width: 'calc(100% - 280px)', // Update this value according to your design
            zIndex: '40', // Update this value according to your design
          }}
        >
          <div className={`flex items-center justify-between px-2`}>
            <div className="flex items-center space-x-2">
              {!lgUp && (
                <button onClick={onNavOpen} className="text-white">
                  <Menu className="h-5 w-5" />
                </button>
              )}
              <button className="text-white">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white">
                <Users className="h-5 w-5" />
              </button>
              <button className="text-white">
                <Tag className="h-5 w-5 text-green-500" />
              </button>
              <button
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                className="cursor-pointer w-10 h-10">
                <Users className="h-5 w-5" />
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
