'use client';
import Input from '@/components/forms/Input';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/app/hooks/useDebounce';
import {Search} from 'react-feather';

export function SearchBar({onSearch, containerClassName}: {onSearch: any, containerClassName?: any}) {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1000);
  const active = useRef(false);
  useEffect(() => {
    if (debouncedSearchTerm || active.current) {
      onSearch({ q: debouncedSearchTerm});
      // eslint-disable-next-line react-hooks/exhaustive-deps
      active.current = true;
    }
  }, [debouncedSearchTerm, onSearch]);
  return (
    <div className={containerClassName || 'relative w-full'}>
      <Input type="text" placeholder="Search"
             className="w-full rounded-xl border py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring focus:border-blue-300"
             name="query" id="query" autoComplete="true" value={query}
             onChange={(e) => setQuery(e.target.value)}/>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <Search/>
        </svg>
      </div>
    </div>
  );
}
