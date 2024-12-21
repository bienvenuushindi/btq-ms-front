'use client'
import { useState, useEffect } from 'react';
import {getImageUrls} from '@/lib/helper';

function useImageCarousel(imagesUrls: string[]) {
  const [images, setImages] = useState([]);

  useEffect(() => {
      setImages(getImageUrls(imagesUrls || []));
  }, [imagesUrls]);

  return images;
}

export default useImageCarousel;
