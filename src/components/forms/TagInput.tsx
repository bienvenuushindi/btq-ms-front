import React, { useState, useEffect, useRef } from 'react';
import '@/styles/form/tag-input.css';
import clsx from 'clsx';
import { XCircle } from 'react-feather';
import Badge from '@/components/utils/Badge';
import TagResultBox from '@/components/tags/SearchTag';

export default function TagInput({ action, defaultTags, suggestionUrl }: any) {
    const [tags, setTags] = useState(defaultTags ? defaultTags.split(',') : []);
    const [input, setInput] = useState('');
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const tagInputRef = useRef(null);

    const addTag = (input: string, reset = true) => {
        const trimmedInput = input.trim();
        if (!tags.includes(trimmedInput) && trimmedInput.length) {
            const newTags = [...tags, trimmedInput];
            setTags(newTags);
            action(newTags);
        }
        if (reset) setInput('');
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const delimiters = [',', 'Enter', ' '];
        if (delimiters.includes(key)) {
            e.preventDefault();
            addTag(input);
        }
        if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();

            setTags(tagsCopy);
            action(tagsCopy);
            setInput(poppedTag);
        }
        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    };

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onFocus = () => {
        setShowAutoComplete(true);
    };

    const removeTag = (index) => {
        const filtered = tags.filter((el, i) => i !== index);
        setTags(filtered);
        action(filtered);
    };

    const handleClickOutside = (e) => {
        if (tagInputRef.current && !tagInputRef.current.contains(e.target)) {
            setShowAutoComplete(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={tagInputRef}>
            <div className={clsx('tags-input-container', 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 -dark:bg-gray-700 -dark:border-gray-600 -dark:placeholder-gray-400 -dark:text-white -dark:focus:ring-blue-500 -dark:focus:border-blue-500')}>
                {tags.map((tag, index) => (
                    <Badge variant="success" className="flex items-center p-1" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close " onClick={() => removeTag(index)}><XCircle size={15} /></span>
                    </Badge>
                ))}
                <input
                    type="text"
                    value={input}
                    className="tags-input w-full"
                    placeholder="Type something"
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    onFocus={onFocus}
                />
            </div>
            {input &&
                <div tabIndex={1} onBlur={() => setShowAutoComplete(false)} className={`absolute bg-white text-start p-2 max-h-40 overflow-x-hidden border w-full z-30 ${showAutoComplete ? '' : 'hidden'}`}>
                    <TagResultBox searchUrl={suggestionUrl} action={addTag} query={input} />
                </div>
            }
        </div>
    );
};
