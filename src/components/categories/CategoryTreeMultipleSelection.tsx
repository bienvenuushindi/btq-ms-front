'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useCallback, useState} from 'react';
import {API_ENDPOINTS} from "@/lib/api";
import {FolderMinus, FolderPlus} from 'react-feather';
import {toggle, toggleWithParent} from "@/lib/utils"; // Import icons

export default function CategoryTreeMultipleSelection({action, initialSelectionIds}) {
    const {data: categories = [], mutate, error, isLoading} = useFetcher(API_ENDPOINTS.CATEGORY_TREE_STRUCTURE);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([...initialSelectionIds]);
    const [collapsedItems, setCollapsedItems] = useState([]);
    const handleRadioChange = useCallback((categoryId, parent_id = null) => {
        let remove_parent_id = null;
        let tempSelectedCategoryIds = [...selectedCategoryIds]
        if (parent_id) {
            // Get all the children ids of this parent category if any
            const childrenIds = categories.find(({id}) => id === parent_id)?.children.map(item => item.id) || [];

            // Check how many elements of childrenIds are in selectedCategoryIds
            const foundChildren = childrenIds.filter((childId: any) => selectedCategoryIds.includes(childId));
            // Update remove_parent_id based on the number of found children
            if (foundChildren.length === 1 && tempSelectedCategoryIds.includes(categoryId)) {
                remove_parent_id = parent_id;
            } else if (foundChildren.length === 0) {
                tempSelectedCategoryIds = [...selectedCategoryIds, parent_id];
            }
        }

        const {items} = toggleWithParent(categoryId, tempSelectedCategoryIds, remove_parent_id);
        setSelectedCategoryIds(items);
        action(items);
    }, [action, categories, selectedCategoryIds]);

    const handleToggleCollapse = useCallback((categoryId: any) => {
        const {items} = toggle(categoryId, collapsedItems)
        setCollapsedItems(items)
    }, [collapsedItems]);

    const renderCategory = (category, parent_id = null) => (
        <li key={category.id}>
            <div className="flex gap-2">
                {category.children.length > 0 && (<span onClick={() => handleToggleCollapse(category.id)}>
                        {collapsedItems.includes(category.id) ? <FolderPlus/> : <FolderMinus/>}
                    </span>)
                }
                <label>
                    <input
                        type="checkbox"
                        name="categorySelection"
                        value={category.id}
                        checked={selectedCategoryIds.includes(category.id)}
                        onChange={() => handleRadioChange(category.id, parent_id)}
                    />
                    {category.name}
                </label>

            </div>
            {category.children.length > 0 && (
                <React.Fragment>
                    <ul className={collapsedItems.includes(category.id) ? 'hidden' : 'ml-12'}>
                        {category.children.map((child) => renderCategory(child, category.id))}
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
                            type="checkbox"
                            name="categorySelection"
                            value={0}
                            defaultChecked={true}
                            // onChange={() => handleRadioChange(null)}
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
