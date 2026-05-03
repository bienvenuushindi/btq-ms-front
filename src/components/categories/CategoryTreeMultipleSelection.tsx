'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useCallback, useState} from 'react';
import {API_ENDPOINTS} from "@/lib/api";
import {FolderMinus, FolderPlus} from 'react-feather';
import {toggle, toggleWithParent} from "@/lib/helper"; // Import icons

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
            <div className="flex items-start gap-2 rounded-2xl px-2 py-1.5 hover:bg-slate-50">
                {category.children.length > 0 && (<button type="button" className="mt-0.5 text-slate-500" onClick={() => handleToggleCollapse(category.id)}>
                        {collapsedItems.includes(category.id) ? <FolderPlus size={16}/> : <FolderMinus size={16}/>}
                    </button>)
                }
                <label className="flex items-start gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        name="categorySelection"
                        value={category.id}
                        checked={selectedCategoryIds.includes(category.id)}
                        onChange={() => handleRadioChange(category.id, parent_id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>{category.name}</span>
                </label>

            </div>
            {category.children.length > 0 && (
                <React.Fragment>
                    <ul className={collapsedItems.includes(category.id) ? 'hidden' : 'ml-6 border-l border-slate-200 pl-4'}>
                        {category.children.map((child) => renderCategory(child, category.id))}
                    </ul>
                </React.Fragment>
            )}
        </li>
    );

    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Category Tree</p>
                <h4 className="mt-2 font-display text-2xl font-bold text-slate-900">Select Category</h4>
                <p className="mt-2 text-sm text-slate-500">Choose the sections where this item should appear.</p>
            </div>
            <div className="max-h-[34rem] overflow-auto pr-2">
            <ul className="space-y-2">
                <li className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <input
                            type="checkbox"
                            name="categorySelection"
                            value={0}
                            defaultChecked={true}
                            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            // onChange={() => handleRadioChange(null)}
                        />
                        Root
                    </label>
                </li>
                <li className="ml-1">
                    <ul className="space-y-1">
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                {renderCategory(category)}
                            </React.Fragment>
                        ))}
                    </ul>
                </li>
            </ul>
            </div>
        </div>
    );
}
