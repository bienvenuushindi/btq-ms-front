import Card from './Card';
import SidebarLink from './SidebarLink';

const links = [
  {label: 'Home', icon: 'Grid', link: '/home'},
  {label: 'Products', icon: 'Book', link: '/products'},
  {label: 'Requisitions', icon: 'BookOpen', link: '/requisitions'},
  {label: 'Profile', icon: 'User', link: '/profile'},
  {label: 'Settings', icon: 'Settings', link: '/settings'},
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex  items-center justify-between flex-wrap">
      <div className="w-full flex flex-col justify-center items-center">
        {/*<Image src={logo} alt="Able logo" priority className="w-14"/>*/}
      </div>
      {links.map((link) => (
        // eslint-disable-next-line react/jsx-key
        <SidebarLink link={link}/>
      ))}
    </Card>
  );
};

export default Sidebar;