import React, {useContext} from 'react';
import clsx from 'clsx';
import PhotoPreviewList from '@/components/PhotoPreviewList';
import {InputImageContext} from '@/components/Form';



const InputFileImage = () => {
  const {photos, setPhotos} = useContext(InputImageContext);
  const MAX_AMOUNT = 5;
  const handlePhotosArray = files => {
    const photosToUpload = [...photos];
    files.some((file) => {
      photosToUpload.push(file);
    });
    setPhotos(photosToUpload);
  };

  const handlePhotoEvent = (e) => {
    const uploadedPhotos = Array.prototype.slice.call(e.target.files);
    handlePhotosArray(uploadedPhotos);
  };
  return (
    <div className="mb-8">
      <input
        id="photosUpload"
        type="file"
        className="hidden"
        accept=".jpg, .jpeg, .png, .webp"
        onChange={handlePhotoEvent}
        disabled={photos.length === MAX_AMOUNT}
      />
      <label htmlFor="photosUpload">
        <a type="button"
           className={clsx('bg-violet-500',
             'text-white',
             'border-transparent',
             'hover:bg-violet-600', photos.length === MAX_AMOUNT && 'bg-black')}>{photos.length === MAX_AMOUNT ? 'Limit Reached!' : 'Add Photos'}
        </a>
      </label>
      <PhotoPreviewList photos={photos}/>
    </div>
  );
};

export default InputFileImage;