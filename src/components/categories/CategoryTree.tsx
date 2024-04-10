'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useState} from 'react';
import {API_ENDPOINTS} from "@/lib/api";

export default function CategoryTree({action}) {
    const {data: categories = [], mutate, error, isLoading} = useFetcher(API_ENDPOINTS.CATEGORY_TREE_STRUCTURE);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleRadioChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
        action(categoryId)
    };
    const renderCategory = (category, disabled=false) => (
        <li key={category.id}>
            <label>
                <input
                    type="radio"
                    name="categorySelection"
                    value={category.id}
                    checked={selectedCategoryId === category.id}
                    onChange={() => handleRadioChange(category.id)}
                    disabled={disabled}
                />
                {category.name}
            </label>
            {category.children.length > 0 && (
                <ul className='ml-8'>
                    {category.children.map((child) => renderCategory(child, true))}
                </ul>
            )}
        </li>
    );

    return (
        <div>
            <h1>Select Category</h1>
            <ul>
                <li>
                    <label>
                        <input
                            type="radio"
                            name="categorySelection"
                            value={0}
                            checked={selectedCategoryId === null}
                            onChange={() => handleRadioChange(null)}
                        />
                        Root
                    </label>
                </li>
                <li className="ml-5">
                    <ul>
                        {categories.map((category: { id: React.Key; }) => (
                            <React.Fragment key={category.id}>
                                {renderCategory(category)}
                            </React.Fragment>
                        ))}
                    </ul>
                </li>

            </ul>
        </div>
    );
}