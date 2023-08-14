import Textarea from '@/components/Textarea';
import React, {createContext} from 'react';
import clsx from 'clsx';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import InputFileImage from '@/components/InputFileImage';
import Button from '@/components/Button';

export const InputImageContext = createContext(null);

export default function Form({fields, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit} className="py-10 w-full">
      {fields.map((field, index) => {
        return (
            <div  key={`form-group-${index}`} className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  {field.label}
                </div>
                {renderField(field)}
              </div>
            </div>
        );
      })
      }
    </form>
  );
}

const renderField = (field) => {
  switch (field['input_type']) {
    case 'text-area':
      return (<Textarea
        required={field.required}
        placeholder={field.placeholder}
        value={field.value}
        name={field.name}
        type="text"
        className={
          clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', field.className)
        }
        onChange={field.action}
      />);
    case 'select':
      return (
        <SelectInput
          required={field.required}
          name={field.name}
          className={
            clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full', field.className)
          }
          onChange={field.action}>
          <option value="">{field.placeholder}</option>
          {Object.keys(field.options).map(option => <option key={option}
                                                            value={option}>{field.options[option]}</option>)}
        </SelectInput>
      );
    case 'radio':
      return (
        field.options.map((option, index) => <>
          <label>{option}</label>
          <Input
            key={option}
            type="radio"
            name={field.name}
            value={option}
            onChange={field.action}
            className={
              clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', field.className)
            }/>
        </>)
      );
    case 'image-file':
      return (
        <InputImageContext.Provider value={field['image_props']}>
          <InputFileImage/>
        </InputImageContext.Provider>
      );
    case 'checkbox':
      return (
        <Input
          checked={field.checked}
          type="checkbox"
          className={
            clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', field.className)
          }
          onChange={field.action}/>
      );
    case 'button':
      return (
        <Button type={field.type} intent="secondary">
          {field.placeholder}
        </Button>
      );
    default:
      return (
        <Input
          required={field.required}
          placeholder={field.placeholder}
          value={field.value}
          type={field.type}
          className={
            clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full ', field.className)
          }
          onChange={field.action}
        />
      );
  }
};