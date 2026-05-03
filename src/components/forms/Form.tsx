import Textarea from '@/components/forms/Textarea';
import React, {createContext} from 'react';
import clsx from 'clsx';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import InputFileImage from '@/components/forms/InputFileImage';
import Button from '@/components/utils/Button';
import TagInput from '@/components/forms/TagInput';
import Toggle from '@/components/forms/Toggle';
import RichEditor from '@/components/forms/RichEditor';

export const InputImageContext = createContext(null);

export default function Form({fields, handleSubmit}: {
    fields: any,
    handleSubmit?: any
}) {
    return (
        <form onSubmit={handleSubmit} className="w-full py-4">
            {Array.isArray(fields) ? renderFields(fields) :
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
                    {Object.keys(fields).map((key, index) => (
                        <section key={key} className="oasis-panel w-full p-6 lg:p-8">
                            <div className="mb-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                                    {index === 0 ? 'Details' : 'Classification'}
                                </p>
                                <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
                                    {index === 0 ? 'Core Information' : 'Categories & Metadata'}
                                </h3>
                            </div>
                            {renderFields(fields[key], true)}
                        </section>
                    ))}
                </div>
            }
        </form>
    );
}

const renderFields = (fields: any[], insidePanel = false) => (
    fields.map((field, index) => (
        <div key={`form-group-${index}`} className={clsx('flex justify-between', insidePanel ? 'mb-5' : 'mb-4')}>
            <div className="w-full text-start">
                {renderGroup(field)}
            </div>
        </div>
    ))
);

const renderGroup = (field) => {
    return (
        <>
            {Array.isArray(field) ?
                <div className="grid gap-4 md:grid-cols-2">
                    {field.map((child, index) => (
                        <div key={`form-field-${field.length}-${index}`} className="flex min-w-0 flex-col">
                            {renderGroup(child)}
                        </div>
                    ))}
                </div>
                :
                <>
                    {field.name && (
                        <label
                            htmlFor={field.label}
                            className={clsx('mb-2 block text-start text-sm font-semibold text-slate-700', field.labelClassName)}
                        >
                            {field.label}
                        </label>
                    )}
                    {renderField(field)}
                </>}
        </>
    );
};

const renderField = (field) => {
    switch (field['input_type']) {
        case 'custom':
            return field.component;
        case 'text-area':
            return (
                <Textarea
                    required={field.required}
                    placeholder={field.placeholder}
                    value={field.value}
                    name={field.name}
                    type="text"
                    className={clsx('oasis-field block min-h-[112px] w-full text-sm', field.className)}
                    onChange={field.action}
                />
            );
        case 'rich-text-area':
            return <RichEditor action={field.action} content={field.value}/>;
        case 'select':
            return (
                <SelectInput
                    name={field.name}
                    value={field.value}
                    className={clsx('oasis-field block w-full text-sm', field.className)}
                    onChange={(e) => field.action(e)}
                    disabled={field.disabled || false}
                >
                    <option value="">{field.placeholder}</option>
                    {Array.isArray(field.options)
                        ? field.options.map((option) => (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        ))
                        : Object.keys(field.options).map((option) => (
                            <option key={field.options[option]} value={field.options[option]}>
                                {field.options[option]}
                            </option>
                        ))}
                </SelectInput>
            );
        case 'radio':
            return (
                <div className="flex flex-wrap gap-3">
                    {field.options.map((option) => (
                        <label key={option} className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                            <Input
                                key={option}
                                type="radio"
                                name={field.name}
                                checked={field.value === option}
                                value={option}
                                onChange={field.action}
                                className={clsx('h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500', field.className)}
                            />
                            {option}
                        </label>
                    ))}
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
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Input
                        checked={field.checked}
                        type="checkbox"
                        className={clsx('h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500', field.className)}
                        onChange={field.action}
                    />
                    <span className="text-sm font-medium text-slate-700">{field.label}</span>
                </div>
            );
        case 'toggle':
            return <Toggle enabled={field.checked} setEnabled={field.action} label={field.label}/>;
        case 'tag':
            return <TagInput defaultTags={field.tags} action={field.action} suggestionUrl={field.suggestion_url}/>;
        case 'button':
            return (
                <Button
                    onClick={field.action}
                    size="small"
                    intent={field.intent || 'primary'}
                    disabled={field.disabled || false}
                    className={clsx('oasis-button mt-3 rounded-2xl px-5 py-3 text-sm font-semibold text-white', field.className)}
                >
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
                    disabled={field.disabled || false}
                    key={field.key || field.name}
                    className={clsx('oasis-field block w-full text-sm', field.className)}
                    onChange={field.action}
                    onBlur={field.onBlur}
                />
            );
    }
};
