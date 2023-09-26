import Textarea from '@/components/Textarea';
import React, {createContext} from 'react';
import clsx from 'clsx';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import InputFileImage from '@/components/InputFileImage';
import Button from '@/components/Button';
import TagInput from '@/components/forms/TagInput';

export const InputImageContext = createContext(null);

export default function Form({fields, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit} className="py-4 w-full">
      {fields.map((field, index) => {
        return (
          <div key={`form-group-${index}`} className="flex mb-4 justify-between">
            <div className="w-full text-start">
              {Array.isArray(field) ?
                <div className='flex gap-2'>
                  {field.map((child, index) => {
                    return (
                      <div key={`form-group-horizontal-${index}`} className={`w-1/${field.length}`}>
                        {renderGroup(child)}
                      </div>
                    )
                  })}
                </div>
                : renderGroup(field)}
            </div>
          </div>
        );
      })
      }
    </form>
  );
}

const renderGroup = (field) => {
  return (
    <>
      {field.name && <label htmlFor={field.label}
                            className={clsx('block mb-2 text-start text-sm font-medium text-gray-900 -dark:text-white', field.labelClassName)}>
        {field.label}
      </label>}
      {renderField(field)}
    </>
  )
}
const renderField = (field) => {
  switch (field['input_type']) {
    case 'custom':
      return field.component
    case 'text-area':
      return (<Textarea
        required={field.required}
        placeholder={field.placeholder}
        value={field.value}
        name={field.name}
        type="text"
        className={
          clsx('block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ', field.className)
        }
        onChange={field.action}
      />);
    case 'select':
      return (
        <SelectInput
          // required={field.required}
          name={field.name}
          value={field.value}
          className={
            clsx('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -dark:bg-gray-700 -dark:border-gray-600 -dark:placeholder-gray-400 -dark:text-white -dark:focus:ring-blue-500 -dark:focus:border-blue-500', field.className)
          }
          onChange={(e)=>field.action(e)} disabled={field.disabled || false}>
          <option value="">{field.placeholder}</option>
          {Array.isArray(field.options)
            ? field.options.map(option =>
              <option key={option.code}
                      value={option.code}>
                {option.name}
              </option>)
            : Object.keys(field.options).map(option =>
              <option key={field.options[option]}
                      value={field.options[option]}>{field.options[option]}</option>)}
        </SelectInput>
      );
    case 'radio':
      return (
        <div className="flex gap-2">
          {field.options.map((option) =>
            <label key={option} className="flex items-center justify-center gap-1"> <Input
              key={option}
              type="radio"
              name={field.name}
              value={option}
              onChange={field.action}
              className={
                clsx('w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600', field.className)
              }
            />{option}</label>)
          }
        </div>
      );
    case 'image-file':
      return (
        <InputImageContext.Provider value={field['image_props']}>
          <InputFileImage/>
        </InputImageContext.Provider>
      );
    case 'checkbox':
      return (
        <div className="flex items-center">
          <Input
            checked={field.checked}
            type="checkbox"
            className={
              clsx('mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600', field.className)
            }
            onChange={field.action}/>
          <span>{field.label}</span>
        </div>
      );
    case 'tag':
      return (
        <TagInput action={field.action}>
          {field.suggestion}
        </TagInput>
      );
    case 'button':
      return (
        <Button type={field.type} size={20} intent="primary" className={
          clsx(' px-2 py-2 text-sm', field.className)
        }>
          {field.placeholder}
        </Button>
      );
    default:
      return (
        <Input
          required={field.required}
          placeholder={field.placeholder}
          value={field.value || ''}
          type={field.type}
          name={field.name}
          className={
            clsx('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -dark:bg-gray-700 -dark:border-gray-600 -dark:placeholder-gray-400 -dark:text-white -dark:focus:ring-blue-500 -dark:focus:border-blue-500', field.className)
          }
          onChange={field.action}
        />
      );
  }
};