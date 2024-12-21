'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useCallback, useState} from 'react';
import {API_ENDPOINTS} from "@/lib/api";
import {FolderMinus, FolderPlus} from 'react-feather';
import {toggle} from "@/lib/helper"; // Import icons

export default function CategoryTree({action}) {
    const {data: categories = [], mutate, error, isLoading} = useFetcher(API_ENDPOINTS.CATEGORY_TREE_STRUCTURE);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [collapsedItems, setCollapsedItems] = useState([]);

    const handleRadioChange = (categoryId: null) => {
        setSelectedCategoryId(categoryId);
        action(categoryId);
    };

    const handleToggleCollapse = useCallback((categoryId: any) => {
        const {items} = toggle(categoryId, collapsedItems)
        setCollapsedItems(items)
    }, [collapsedItems]);

    const renderCategory = (category, disabled=false) => (
        <li key={category.id}>
            <div className="flex gap-2">
                {category.children.length > 0 && (<span onClick={() => handleToggleCollapse(category.id)}>
                        {collapsedItems.includes(category.id) ? <FolderPlus/> : <FolderMinus/>}
                    </span>)
                }
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
            </div>
            {category.children.length > 0 && (
                <React.Fragment>
                    <ul className={collapsedItems.includes(category.id) ? 'hidden' : 'ml-12'}>
                        {category.children.map((child) => renderCategory(child, true))}
                    </ul>
                </React.Fragment>
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
                        {categories.map((category) => (
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
