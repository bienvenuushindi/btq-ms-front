'use client'
import React, {useEffect, useState} from 'react';
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
            className="border border-gray-200 rounded-lg p-1 min-h-[300px] flex flex-col"
        />
    );
}

export function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}