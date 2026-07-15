import Image from 'next/image';
import React, {useContext} from 'react';
import {InputImageContext} from '@/components/forms/Form';
import {X} from 'react-feather';


export default function PhotoPreviewItem({photo, index}) {
  const {setPhotos} = useContext(InputImageContext);
  const isUrl = typeof photo === 'string';
  return (
    <li className="h-20 w-20 shrink-0 rounded-md border border-gray-100 shadow sm:h-28 sm:w-28">
      <div className="mb-2 relative flex items-center justify-center rounded bg-gray-100 w-full h-full">
        <button type="button"
                className="bg-gray-200 flex items-center justify-center filter_photo absolute w-6 h-6 top-0 left-0 bg-white bg-opacity-90 backdrop-blur-sm  text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() =>
                  setPhotos((photos) => {
                    return photos.filter((photo, i) => i !== index);
                  })}>
          <X size={20} color="red"/>
        </button>
        <Image
          width={100}
          height={100}
          className="h-full w-full object-cover"
          src={isUrl ? photo : URL.createObjectURL(photo)}
          alt="Upload file"
          priority={true}
        />
      </div>
    </li>

  );
}
