import React from 'react';
import PhotoPreviewItem from '@/components/PhotoPreviewItem';

export default function PhotoPreviewList({photos}) {
  return (
    <ul className="flex gap-2">
      {photos && photos.map((photo, index) => {
        return (<PhotoPreviewItem key={index} photo={photo} index={index}/>);
      })}
    </ul>
  );
}