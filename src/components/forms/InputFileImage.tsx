import React, {useContext} from 'react';
import clsx from 'clsx';
import PhotoPreviewList from '@/components/forms/PhotoPreviewList';
import {InputImageContext} from '@/components/forms/Form';
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
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start">
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
           className={clsx('flex min-h-[126px] min-w-[126px] flex-col items-center justify-center rounded-[24px] border border-dashed text-sm font-medium transition',
             photos.length !== MAX_AMOUNT && 'border-slate-300 bg-slate-50 px-4 py-5 text-slate-500 hover:border-primary hover:bg-orange-50 hover:text-primary',
             photos.length === MAX_AMOUNT && 'bip-animation bg-red-100 px-2.5 py-0.5'
           )}>
          {photos.length === MAX_AMOUNT ? <span className=" text-red-800">Limit Reached</span> :
            <>
              <Camera size={42} color="#94a3b8"/>
              <span className="mt-3 text-center text-sm font-semibold">Upload photos</span>
              <span className="mt-1 text-center text-xs text-slate-400">PNG, JPG, WEBP up to 5 files</span>
            </>}
        </a>
      </label>
      <PhotoPreviewList photos={photos}/>
    </div>
  );
};

export default InputFileImage;
