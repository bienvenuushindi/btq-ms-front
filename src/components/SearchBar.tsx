'use client';
import Input from '@/components/Input';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/app/hooks/useDebounce';
import {Search} from 'react-feather';

export function SearchBar({updateList, submitTo}) {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1000);
  const active = useRef(false);
  useEffect(() => {
    if (query || active.current) {
      updateList(submitTo + '?q=' + query);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      active.current = true;
    }
  }, [debouncedSearchTerm]);
  return (
      <div className="relative w-full ">
        <Input type="text" placeholder="Search"
               className="w-full py-2 pl-10 pr-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
               name="query" id="query" autoComplete="true" value={query}
               onChange={(e) => setQuery(e.target.value)}/>
        <div className="absolute inset-y-0 left-0  pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <Search/>
          </svg>
        </div>
      </div>
  );
}