import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import PhotoPreviewList from '@/components/forms/PhotoPreviewList';
import {InputImageContext} from '@/components/forms/Form';
import {Camera} from 'react-feather';
import '@/styles/animation/style.css';


const InputFileImage = () => {
  const {photos, setPhotos} = useContext(InputImageContext);
  const MAX_AMOUNT = 5;
  const [error, setError] = useState('');

  const getPhotoName = (photo) => {
    if (typeof photo === 'string') {
      const path = photo.split('?')[0];
      return decodeURIComponent(path.split('/').pop() || '').toLowerCase();
    }

    return String(photo?.name || '').toLowerCase();
  };

  const handlePhotosArray = (files) => {
    const remainingSlots = MAX_AMOUNT - photos.length;
    if (remainingSlots <= 0) {
      return;
    }

    const existingNames = new Set(photos.map((photo) => getPhotoName(photo)).filter(Boolean));
    const uniqueFiles = [];
    const duplicateNames = [];

    files.forEach((file) => {
      const fileName = getPhotoName(file);

      if (!fileName) {
        return;
      }

      if (existingNames.has(fileName)) {
        duplicateNames.push(file.name);
        return;
      }

      existingNames.add(fileName);
      uniqueFiles.push(file);
    });

    if (duplicateNames.length > 0) {
      setError(
        `We skipped ${duplicateNames.length > 1 ? 'these files' : 'this file'} because ${duplicateNames.length > 1 ? 'their names are' : 'its name is'} already in your selection: ${duplicateNames.join(', ')}. You do not need to delete anything unless you want to replace an existing image.`
      );
    } else {
      setError('');
    }

    const photosToUpload = [...photos, ...uniqueFiles.slice(0, remainingSlots)];
    setPhotos(photosToUpload);
  };

  const handlePhotoEvent = (e) => {
    const uploadedPhotos = Array.prototype.slice.call(e.target.files);
    handlePhotosArray(uploadedPhotos);
    e.target.value = '';
  };
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start">
      <div className="flex min-w-0 flex-col">
        <input
          id="photosUpload"
          type="file"
          multiple
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
        {error && (
          <p className="mt-3 max-w-sm rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium leading-6 text-amber-900 shadow-sm">
            {error}
          </p>
        )}
      </div>
      <PhotoPreviewList photos={photos}/>
    </div>
  );
};

export default InputFileImage;
