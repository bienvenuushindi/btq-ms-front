'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useCallback, useEffect, useState} from 'react';
import {API_ENDPOINTS} from "@/lib/api";
import {FolderMinus, FolderPlus} from 'react-feather';
import {toggle} from "@/lib/helper"; // Import icons

export default function CategoryTree({action}) {
    const {data: categories = [], mutate, error, isLoading} = useFetcher(API_ENDPOINTS.CATEGORY_TREE_STRUCTURE);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [collapsedItems, setCollapsedItems] = useState([]);
    const [hasInitializedCollapse, setHasInitializedCollapse] = useState(false);

    const collectExpandableIds = useCallback((items) => (
        items.flatMap((category) => [
            ...(category.children?.length ? [category.id] : []),
            ...collectExpandableIds(category.children || []),
        ])
    ), []);

    useEffect(() => {
        if (hasInitializedCollapse || categories.length === 0) return;

        setCollapsedItems(collectExpandableIds(categories));
        setHasInitializedCollapse(true);
    }, [categories, collectExpandableIds, hasInitializedCollapse]);

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
            <div className="flex items-start gap-2 rounded-2xl px-2 py-1.5 hover:bg-slate-50">
                {category.children.length > 0 && (<button type="button" className="mt-0.5 text-slate-500" onClick={() => handleToggleCollapse(category.id)}>
                        {collapsedItems.includes(category.id) ? <FolderPlus size={16}/> : <FolderMinus size={16}/>}
                    </button>)
                }
                <label className="flex items-start gap-2 text-sm text-slate-700">
                    <input
                        type="radio"
                        name="categorySelection"
                        value={category.id}
                        checked={selectedCategoryId === category.id}
                        onChange={() => handleRadioChange(category.id)}
                        disabled={disabled}
                        className="mt-1 h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>{category.name}</span>
                </label>
            </div>
            {category.children.length > 0 && (
                <React.Fragment>
                    <ul className={collapsedItems.includes(category.id) ? 'hidden' : 'ml-6 border-l border-slate-200 pl-4'}>
                        {category.children.map((child) => renderCategory(child, true))}
                    </ul>
                </React.Fragment>
            )}
        </li>
    );

    return (
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Parent Category</p>
                <h4 className="mt-2 font-display text-2xl font-bold text-slate-900">Select Category</h4>
                <p className="mt-2 text-sm text-slate-500">Pick the parent category for this new category.</p>
            </div>
            <div className="max-h-[28rem] overflow-auto pr-2">
            <ul className="space-y-2">
                <li className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <input
                            type="radio"
                            name="categorySelection"
                            value={0}
                            checked={selectedCategoryId === null}
                            onChange={() => handleRadioChange(null)}
                            className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
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
