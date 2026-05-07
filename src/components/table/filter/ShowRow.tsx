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
    <div className="flex w-full items-center gap-2 sm:w-56">
      {field.name && <label htmlFor={field.label}
                            className={clsx('text-start text-sm font-semibold text-slate-500' )}>
          Show
      </label>}
      <SelectInput
        name={'show-count'}
        value={field.value}
        className={
          clsx('block w-full rounded-2xl border-slate-200 bg-slate-50 py-2.5 text-sm text-slate-700 focus:border-slate-300 focus:ring-slate-100', field.className)
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
