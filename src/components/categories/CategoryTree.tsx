'use client';
import {useFetcher} from '@/app/hooks/useFetcher';
import React, {useState} from 'react';

export default function CategoryTree({action}) {
  const {data: categories = [], mutate, error, isLoading} = useFetcher('/categories/tree_structure');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleRadioChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    action(categoryId)
  };
  const renderCategory = (category) => (
    <li key={category.id}>
      <label>
        <input
          type="radio"
          name="categorySelection"
          value={category.id}
          checked={selectedCategoryId === category.id}
          onChange={() => handleRadioChange(category.id)}
        />
        {category.name}
      </label>
      {category.children.length > 0 && (
        <ul className='ml-12'>
          {category.children.map((child) => renderCategory(child))}
        </ul>
      )}
    </li>
  );

  return (
    <div>
      <h1>Select Category</h1>
      <ul>
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            {renderCategory(category)}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}