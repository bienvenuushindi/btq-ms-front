import {createContext, useContext} from 'react';
import {XCircle} from 'react-feather';

export const SidebarContext = createContext(null);

export const SidebarContainer = ({title, children}) => {
  const {openBar, setOpenBar, setSidebarData} = useContext(SidebarContext);
  return (
    <aside
      className={`bg-gray-100 fixed top-16 w-screen right-0 bottom-[60px] border-gray-700 h-full lg:absolute lg:top-0 lg:w-96 lg:h-full lg:border-l z-50 ${
        openBar.state ? 'translate-x-0' : 'translate-x-full'
      } transition-all`}
    >
      <div className="header">
        <h2>{title}</h2>
        <button
          name="close modal"
          className="p-1 text-2xl text-gray-500 ring-1 ring-gray-500 hover:text-gray-300 hover:ring-gray-300 rounded-full transition-all focus:outline-none active:bg-gray-700 h-fit"
          onClick={() => {
            setSidebarData({});
            setOpenBar((prev)=>({...prev,state: false}));
          }}
        >
          <XCircle/>
        </button>
      </div>
      <div className="body relative">
        {children}
      </div>
      <div className="footer">

      </div>
    </aside>
  );
};