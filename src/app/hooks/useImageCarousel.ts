'use client'
import { useState, useEffect } from 'react';
import {getImageUrls} from '@/lib/utils';

function useImageCarousel(imagesUrls) {
  const [images, setImages] = useState([]);

  useEffect(() => {
      setImages(getImageUrls(imagesUrls || []));
    // }
  }, [imagesUrls]);

  return images;
}

export default useImageCarousel;
