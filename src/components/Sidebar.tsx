'use client'
import SidebarLink from './SidebarLink';
const links = [
  {label: 'Home', icon: 'Home', link: '/home'},
  {label: 'Products', icon: 'Book', link: '/products'},
  {label: 'Requisitions', icon: 'BookOpen', link: '/requisitions'},
  {label: 'Suppliers', icon: 'Truck', link: '/suppliers'},
  {label: 'Categories', icon: 'Grid', link: '/categories'},
  {label: 'Profile', icon: 'User', link: '/profile'},
  {label: 'Settings', icon: 'Settings', link: '/settings'},
];
const Sidebar = ({open, onClose}) => {
  // const lgUp = window.innerWidth >= 1024; // Example media query breakpoint
  const lgUp = true; // Example media query breakpoint

  const content = (
      <div className="h-full bg-darkBlue-300">
        <div className="h-full overflow-auto ">
          <div className="py-3 flex justify-center">
            <div className="inline-flex h-32 w-32 bg-white ">
              <div>LOGO</div>
            </div>
            {/* Rest of the header content */}
          </div>
          <div className="h-px bg-neutral-700"/>
          <nav className="flex-grow  py-3">
            <ul className="list-none p-0 m-0">
              {links.map((link,index) => (
                <SidebarLink key={"sidebar-"+index} link={link}/>
              ))}
            </ul>
          </nav>
          <div className="h-px bg-neutral-700"/>
          <div
            className="px-2 py-3"
          >
            {/* Rest of the footer content */}
          </div>
        </div>
        <div className="h-px bg-neutral-400" />
        <div className="h-[8px] bg-neutral-400" />
      </div>
  );

  if (lgUp) {
    return (
      <div
        className="fixed left-0 top-0 h-full w-72  z-50  bg-darkBlue-500 text-white"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full w-280 bg-neutral-800 text-white ${open ? '' : 'hidden'}`}
    >
      {content}
    </div>
  );
};

// return (
//   <><Card className="bg-gray-900  h-full max-w-52 min-w-60 w-min-60 flex  items-center justify-between flex-col ">
//     <div className="w-full flex flex-col justify-center items-center h-20 border-b text-gray-50">
//       Logo
//     </div>
//     <div className="flex-grow flex flex-col items-center justify-around flex-wrap">
//       {links.map((link) => (
//         // eslint-disable-next-line react/jsx-key
//         <SidebarLink link={link}/>
//       ))}
//     </div>
//     <div className="footer text-gray-50 border-t h-20 w-full">
//       footer
//     </div>
//   </Card>
//
//   </>
//
// );

export default Sidebar;