'use client';
import Input from '@/components/Input';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/app/hooks/useDebounce';

export function SearchBar({updateList, submitTo}) {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1000);
  const active = useRef(false)
  useEffect(() => {
    if(query || active.current){
      updateList(submitTo + '?q=' + query);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      active.current = true
    }
  }, [debouncedSearchTerm]);
  return (
    <>
      <div className=" flex-grow">
        <label htmlFor="query" className="text-center font-bold hidden"> Search </label>
        <div
          className="relative border flex items-center border w-full h-12 rounded-lg focus-within:boder-none  bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <Input type="text" placeholder="Search" className="peer flex-grow outline-none border-0 text-gray-700 pr-2"
                 name="query" id="query" autoComplete="true" value={query}
                 onChange={(e) => setQuery(e.target.value)}></Input>
        </div>
      </div>
    </>
  );
}