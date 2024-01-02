'use client'
import clsx from 'clsx';
import SelectInput from '@/components/SelectInput';
import React, {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';

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
    <div className="flex items-center gap-2 w-52">
      {field.name && <label htmlFor={field.label}
                            className={clsx('text-start text-md font-bold text-gray-900 -dark:text-white' )}>
          Show
      </label>}
      <SelectInput
        name={'show-count'}
        value={field.value}
        className={
          clsx('flex-grow-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  -dark:bg-gray-700 -dark:border-gray-600 -dark:placeholder-gray-400 -dark:text-white -dark:focus:ring-blue-500 -dark:focus:border-blue-500', field.className)
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