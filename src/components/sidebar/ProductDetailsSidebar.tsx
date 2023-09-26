import {useContext} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import 'react-gallery-carousel/dist/index.css';
import ShowImages from '@/components/ShowImages';


export default function ProductDetailsSidebar() {
  const {sidebarData} = useContext(SidebarContext);
  return (
    <>
      <ShowImages/>
      {sidebarData && <div>Hello I am the product detail {sidebarData.size}</div> }
    </>
  );
}