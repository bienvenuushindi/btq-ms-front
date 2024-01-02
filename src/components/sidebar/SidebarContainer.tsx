import {createContext, useContext} from 'react';
import {XCircle} from 'react-feather';
import clsx from 'clsx';

export const SidebarContext = createContext(null);

export const SidebarContainer = ({title, children}) => {
  const {openBar, setOpenBar, setSidebarData} = useContext(SidebarContext);
  return (
    <>
      <div onClick={(e) => {
        e.stopPropagation()
        setSidebarData({});
        setOpenBar((prev) => ({...prev, state: false}));
      }} tabIndex="-1"
           className={clsx("bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen  transition-all ", !openBar.state && 'hidden')}>
      </div>

      <div
        className={`bg-white fixed top-16 w-screen  right-0 bottom-[60px] border-gray-700 h-full lg:absolute lg:top-0 lg:w-96 lg:h-full lg:border-l z-50 ${
          openBar.state ? 'translate-x-0' : 'translate-x-full'
        } transition-all`}

      >
        <h5 id="drawer-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
               viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          Info
        </h5>
        <button type="button"
                onClick={() => {
                  setSidebarData({});
                  setOpenBar((prev) => ({...prev, state: false}));
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute  right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
          <XCircle size={20}/>
          <span className="sr-only">Close menu</span>
        </button>
        <div className='pointer-events-auto'>
          <div className="header">
            <h2>{title}</h2>
          </div>
          <div className="body relative ">
            {children}
          </div>
          <div className="footer">

          </div>
        </div>
      </div>
    </>
  );
};