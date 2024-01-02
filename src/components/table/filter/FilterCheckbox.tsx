import React, {useState} from 'react';
import Input from '@/components/Input';
import clsx from 'clsx';

const FilterCheckbox = ({field}) => {
  return (
    <div className="flex gap-2">
      {field.options.map((option) =>
        <label key={option} className="flex items-center justify-center gap-1">
          <Input
            key={option}
            type="radio"
            name={field.name}
            checked={field.value === option}
            value={option}
            onChange={field.action}
            className={
              clsx('w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600', field.className)
            }
          />{option.toUpperCase()}</label>)
      }
    </div>
  );
};

export default FilterCheckbox;