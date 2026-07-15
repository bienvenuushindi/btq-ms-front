import React from 'react';
import {capitalizeFirstLetter} from '@/lib/helper';

const TableMetaData = ({ meta, labels = {} }) => {
  return (
      <div className="flex min-w-0 flex-wrap items-center gap-1.5 py-1 text-[11px] sm:gap-2 sm:text-sm">
        {Object.keys(meta).map((key) => (
          <div key={key} className="inline-flex min-w-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600 sm:gap-1.5 sm:px-3 sm:py-1">
            <span>{labels[key] || capitalizeFirstLetter(key)}:</span>
            <span className="text-right font-semibold text-slate-900">{meta[key]}</span>
          </div>
        ))}
      </div>
  );
};

export default TableMetaData;
