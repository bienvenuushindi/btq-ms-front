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
  return (urls || []).map((image_path) => ({
    src: `${BASE_URL + image_path}`
  }));
};