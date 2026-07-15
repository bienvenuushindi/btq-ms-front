import React from 'react';
import Input from '@/components/forms/Input';
import clsx from 'clsx';

const FilterCheckbox = ({field}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {field.options.map((option) =>
        <label key={option} className="flex min-h-9 items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 text-xs font-bold capitalize text-slate-600 sm:text-sm">
          <Input
            key={option}
            type="radio"
            name={field.name}
            checked={field.value === option}
            value={option}
            onChange={field.action}
            className={
              clsx('w-4 h-4 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600', field.className)
            }
          />{option}</label>)
      }
    </div>
  );
};

export default FilterCheckbox;
