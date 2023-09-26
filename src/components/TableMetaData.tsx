import React from 'react';
import {capitalizeFirstLetter} from '@/lib/utils';

const TableMetaData = ({ meta }) => {
  return (
      <div className="grid grid-cols-2 gap-2 py-1">
        {Object.keys(meta).map((key) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-600">{capitalizeFirstLetter(key)}:</span>
            <span className="text-gray-900">{meta[key]}</span>
          </div>
        ))}
      </div>
  );
};

export default TableMetaData;