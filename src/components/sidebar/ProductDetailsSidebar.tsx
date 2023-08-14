'use client';
import {useContext, useEffect, useState} from 'react';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {BASE_URL} from '@/lib/api';


export default function ProductDetailsSidebar() {
  const {openBar, sidebarData} = useContext(SidebarContext);
  const [images, setImages] = useState([]);
  const getImageUrls = () => {
    return (sidebarData.image_urls || []).map((image_path) => ({
      src: `${BASE_URL + image_path}`
    }));
  };

  useEffect(() => {
    if (openBar.state) {
      const images_urls = getImageUrls();
      setImages(images_urls);
    }
  }, [sidebarData]);
  return (
    <>
      {images.length === 0 ? <div>No Picture</div> : <Carousel images={images} style={{height: 400, width: '100%'}}/>}
      {sidebarData && <div>Hello I am the product detail {sidebarData.size}</div> }
    </>
  );
}