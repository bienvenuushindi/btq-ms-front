'use client'
import SidebarLink from "@/components/sections/menu-sidebar/SidebarLink";
import clsx from "clsx";
import {Package} from "react-feather";

const sections = [
  {
    label: 'Main',
    links: [
      {label: 'Dashboard', icon: 'Home', link: '/home'},
      {label: 'Requisitions', icon: 'BookOpen', link: '/requisitions'},
      {label: 'Products', icon: 'Book', link: '/products'}
    ]
  },
  {
    label: 'Business',
    links: [
      {label: 'Suppliers', icon: 'Truck', link: '/suppliers'},
      {label: 'Categories', icon: 'Grid', link: '/categories'}
    ]
  },
  {
    label: 'Settings',
    links: [
      {label: 'Profile', icon: 'User', link: '/account'},
      {label: 'Settings', icon: 'Settings', link: '/settings'}
    ]
  }
];
const Sidebar = ({
  open,
  isCollapsed = false,
  onCloseMobile
}: {
  open?: boolean,
  isCollapsed?: boolean,
  onCloseMobile?: () => void
}) => {

  const content = (
      <div className="surface-dark h-full text-primary-foreground">
        <div className="flex h-full flex-col overflow-auto border-r border-white/8">
          <div className={clsx("flex justify-center border-b border-white/8 pb-5 pt-4 transition-all duration-300", isCollapsed ? 'px-3' : 'px-4')}>
            <div className={clsx("transition-all duration-300", isCollapsed ? 'w-auto p-2' : 'w-full')}>
              <div className={clsx("flex items-center", isCollapsed ? 'justify-center' : 'gap-3')}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_24px_rgba(255,122,53,0.3)]">
                  <Package className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="font-display text-[2rem] font-bold leading-none text-white">OasisMarket</p>
                    <p className="mt-1 text-sm text-slate-300">Admin Dashboard</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <p className="mt-5 rounded-2xl bg-white/8 px-4 py-3 text-sm leading-6 text-slate-200">
                  Track stock flow, supplier activity, and requisition movement from one workspace.
                </p>
              )}
            </div>
          </div>
          <nav className="flex-grow py-4">
            <div className={clsx("space-y-5 transition-all duration-300", isCollapsed ? 'px-2' : 'px-3')}>
              {sections.map((section) => (
                <div key={section.label}>
                  {!isCollapsed && (
                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {section.label}
                    </p>
                  )}
                  <ul className={clsx("m-0 list-none", isCollapsed ? 'mt-2' : 'mt-3')}>
                    {section.links.map((link, index) => (
                      <SidebarLink
                        key={`${section.label}-${index}`}
                        link={link}
                        isCollapsed={isCollapsed}
                        onNavigate={onCloseMobile}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
          <div className={clsx("border-t border-white/8 pb-5 pt-4", isCollapsed ? 'px-2' : 'px-4')}>
            <div className={clsx("rounded-2xl bg-white/8 transition-all duration-300", isCollapsed ? 'p-2' : 'p-4')}>
              <div className={clsx("flex items-center", isCollapsed ? 'justify-center' : 'gap-3')}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white">
                  A
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="text-base font-semibold text-white">OasisMarket Admin</p>
                    <p className="text-sm text-slate-300">Super Admin</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <>
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 hidden h-full transition-[width] duration-300 lg:block',
          isCollapsed ? 'w-24' : 'w-64'
        )}
      >
        {content}
      </div>
      <div
        className={clsx('fixed inset-0 z-50 bg-black/30 lg:hidden', open ? 'block' : 'hidden')}
        onClick={onCloseMobile}
      />
      <div
        className={clsx(
          'fixed left-0 top-0 z-[60] h-full w-[85vw] max-w-xs transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </div>
    </>
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
