import Image from 'next/image';
import React, {useContext} from 'react';
import {InputImageContext} from '@/components/Form';


export default function PhotoPreviewItem({photo, index}) {
  const {setPhotos} = useContext(InputImageContext);
  return (
    <div>
      <button type="button" className="filter_photo" onClick={() =>
        setPhotos((photos) => {
          return photos.filter((photo, i) => i !== index);
        })}>x
      </button>
      <Image width={60} height={60} src={URL.createObjectURL(photo)} alt="Upload file"/>
    </div>
  );
}