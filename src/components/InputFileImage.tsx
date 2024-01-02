import React, {useContext} from 'react';
import clsx from 'clsx';
import PhotoPreviewList from '@/components/PhotoPreviewList';
import {InputImageContext} from '@/components/Form';
import {Camera} from 'react-feather';
import '@/styles/animation/style.css';


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
    <div className="mb-4 flex gap-2">
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
           className={clsx(' text-sm font-medium mr-2 rounded  border  border-dashed flex items-center',
             photos.length !== MAX_AMOUNT && 'bg-gray-100 hover:border-gray-600 border-gray-500 hover:bg-gray-500 p-4',
             photos.length === MAX_AMOUNT && 'bip-animation bg-red-100 px-2.5 py-0.5'
           )}>
          {photos.length === MAX_AMOUNT ? <span className=" text-red-800">Limit Reached</span> :
            <Camera size={50} color="#bbbec4"/>}
        </a>
      </label>
      <PhotoPreviewList photos={photos}/>
    </div>
  );
};

export default InputFileImage;