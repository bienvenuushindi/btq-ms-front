import React from 'react';
import {capitalizeFirstLetter} from '@/lib/helper';

const TableMetaData = ({ meta }) => {
  return (
      <div className="flex flex-wrap items-center gap-2 py-1 text-xs sm:text-sm">
        {Object.keys(meta).map((key) => (
          <div key={key} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
            <span>{capitalizeFirstLetter(key)}:</span>
            <span className="text-right font-semibold text-slate-900">{meta[key]}</span>
          </div>
        ))}
      </div>
  );
};

export default TableMetaData;
