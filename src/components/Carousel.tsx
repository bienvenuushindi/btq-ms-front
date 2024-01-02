import {BASE_URL} from '@/lib/api';

export default function Carousel({image_urls = []}) {
  const getImageUrls = () => {
    return (image_urls || []).map((image_path) => ({
      src: `${BASE_URL + image_path}`
    }));
  };
  // const imageList = images_url.map((image_url, index) => {
  //   return (<div key={'image-' + index} className=" duration-700 ease-in-out" data-carousel-item>
  //     <Image src={BASE_URL + image_url} alt={image_url.alt || '...'}
  //            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" width={500} height={500}/>
  //   </div>)
  // });
  //
  // const buttonList = images_url.map((image_url, index) => {
  //     return (
  //       <button key={'button-' + index} type="button" className="w-3 h-3 rounded-full"
  //               aria-current={index == 0 || 'false'}
  //               aria-label={'Slide' + (index + 1)}
  //               data-carousel-slide-to={index}></button>
  //     )
  //   }
  //   // eslint-disable-next-line react/jsx-key
  //
  // );
  return (
    <>

    </>
  );
}
