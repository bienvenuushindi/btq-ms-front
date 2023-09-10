'use client';
import {useCallback} from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
import {Menu, Transition} from '@headlessui/react';
// import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
  const {anchorEl, onClose, open} = props;
  // const router = useRouter();
  // const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      //   onClose?.();
      //   auth.signOut();
      //   router.push('/auth/login');
    },
    [onClose]
  );

  return (
    <Transition
      show={open}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Menu as="div"
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          <div className="px-4 py-2">
            <p className="text-xs text-gray-400">Account</p>
            <p className="text-sm font-medium text-gray-800">Anika Visser</p>
          </div>
          <div className="border-t border-gray-200">
            <Menu.Item>
              {({active}) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </div>
      </Menu>
    </Transition>
  );
};
//
// AccountPopover.propTypes = {
//   anchorEl: PropTypes.any,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired,
// };
