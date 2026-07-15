import React from 'react';
import PhotoPreviewItem from '@/components/forms/PhotoPreviewItem';

export default function PhotoPreviewList({photos}) {
  return (
    <ul className="flex min-w-0 max-w-full flex-wrap gap-2 overflow-x-auto">
      {photos && photos.map((photo, index) => {
        return (<PhotoPreviewItem key={index} photo={photo} index={index}/>);
      })}
    </ul>
  );
}
