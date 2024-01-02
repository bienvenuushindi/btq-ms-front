import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';

export default function Carousel ({ images, style, wrapperClassName }){
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    className: 'bg-gray-100',
    arrows: true,
    accessibility: true,
    pauseOnHover: true
  };
  return (
    <div className={clsx(wrapperClassName || 'w-auto max-w-xs', 'h-auto mb-4')}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="">
            <Image
              src={image}
              alt={`slide ${index + 1}`}
              width={style.width}
              height={style.height}
              className="my-auto py-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
    // <div>
    //   <Slider {...settings}>
    //     {images.map((image, index) => (
    //       <div key={index}>
    //         <Image
    //           src={image}
    //           alt={`slide ${index + 1}`}
    //           width={style.width}
    //           height={style.height}
    //         />
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
  );
};

