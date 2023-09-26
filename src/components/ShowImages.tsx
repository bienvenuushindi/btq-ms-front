'use client';
import {useContext, useEffect, useRef, useState} from 'react';
import {BASE_URL} from '@/lib/api';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import Carousel from 'react-gallery-carousel';

export default function ShowImages() {
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
      {images.length === 0 ? <div>No Picture</div> : <div id="carousel" className="p-2 shadow"><Carousel images={images} style={{height: 400, width: '100%'}}/></div>}
    </>
  )
}