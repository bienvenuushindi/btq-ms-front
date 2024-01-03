'use client';
import Carousel from '@/components/carousel/Carousel';
import useImageCarousel from '@/app/hooks/useImageCarousel';

export default function ShowImages({imagesUrls, width, height,carouselWrapperClassName}: {imagesUrls:any, width?: any, height?:any,carouselWrapperClassName?:any}) {
  const images = useImageCarousel(imagesUrls);
  return (
    <>
      {images.length === 0 ? <div>No Picture</div> : <div id="carousel" className="p-2 shadow flex justify-around">
        <Carousel
          images={images}
          style={{ height: width || 300, width: height || 300 }}
          wrapperClassName={carouselWrapperClassName}
        />
      </div>}
    </>
  )
}