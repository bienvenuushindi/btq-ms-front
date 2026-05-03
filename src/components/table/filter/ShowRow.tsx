'use client'
import clsx from 'clsx';
import SelectInput from '@/components/forms/SelectInput';
import React, {useState} from 'react';

export const ShowRow = ({updateCount}) => {
  const [count, setCount] = useState(10)
  const field= {
    label: 'count',
    required: true,
    placeholder: 'Select',
    name: 'count',
    value: count,
    input_type: 'select',
    className: '',
    options: [5,10,25,50,75,100],
    action: (e) => {
      setCount(e.target.value)
      updateCount({ 'page[size]': e.target.value });
    }
  };
  return(
    <div className="flex w-full items-center gap-2 sm:w-52">
      {field.name && <label htmlFor={field.label}
                            className={clsx('text-start text-sm font-semibold text-gray-500 -dark:text-white' )}>
          Show
      </label>}
      <SelectInput
        name={'show-count'}
        value={field.value}
        className={
          clsx('block w-full rounded-xl bg-gray-50 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 -dark:border-gray-600 -dark:bg-gray-700 -dark:text-white -dark:placeholder-gray-400 -dark:focus:border-blue-500 -dark:focus:ring-blue-500', field.className)
        }
        onChange={field.action} >
        <option value="">{field.placeholder}</option>
        {field.options.map(option =>
          <option key={option}
                  value={option}>
            {option}
          </option>)
        }
      </SelectInput>
    </div>
  )
};
