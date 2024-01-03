import {BASE_URL} from '@/lib/api';

type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P] extends object ? DTO<T[P]> : T[P]
};

export type DTO<T> = DataPropertiesOnly<T>;

export  const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getImageUrls = (urls) => {
  return (urls || []).map((image_path) => (
    `${BASE_URL + image_path}`));
};

// urlUtils.js
export const updateUrl = <T extends Record<string, string | undefined | null>>(
  prevUrl: string,
  newFilters: T
) => {
  const url = new URL(prevUrl);
  const params = new URLSearchParams(url.search);

  // Update or add each new filter to the URL
  Object.entries(newFilters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  // Update the URL with the new parameters
  url.search = params.toString();
  return url.toString();
};


export function truncateDescription(description, maxLength = 200) {
  if (!description || description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength) + '...';
}

// urlUtils.js
// export const updateUrl = (prevUrl, newFilters) => {
//   const url = new URL(prevUrl);
//
//   // Convert nested parameters to the encoded format
//   Object.entries(newFilters).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== '') {
//       url.searchParams.set(encodeURIComponent(key), encodeURIComponent(value));
//     } else {
//       url.searchParams.delete(encodeURIComponent(key));
//     }
//   });

//   return url.toString();
// };



export const tagColors ={
  primary: '#0074bd'
}