import React from 'react';
import PhotoPreviewItem from '@/components/PhotoPreviewItem';

export default function PhotoPreviewList({photos}) {
  return (
    <div className="add_spot_photos_div">
      {photos && photos.map((photo, index) => {
        return (<PhotoPreviewItem key={index} photo={photo} index={index}/>);
      })}
    </div>
  );
}