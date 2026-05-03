'use client'
import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify'
export default function RichEditor({ content, action }) {
    const [value, setValue] = useState(content || '<p>Type Description ...</p>');

    const handleChange = (newValue) => {
        setValue(newValue);
        action(newValue); // Call the action function with the new value
    };

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange}
            className="overflow-hidden rounded-[20px] border border-slate-200 bg-white min-h-[320px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        />
    );
}

export function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}
