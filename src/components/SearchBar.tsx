'use client';
import Input from '@/components/forms/Input';
import {useEffect, useRef, useState} from 'react';
import {useDebounce} from '@/app/hooks/useDebounce';
import {Search, X} from 'react-feather';
import clsx from 'clsx';

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
    <div className={containerClassName || 'w-full'}>
      <div className="group relative overflow-hidden rounded-[22px] border border-slate-300 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition focus-within:border-slate-400 focus-within:shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition group-focus-within:bg-orange-50 group-focus-within:text-primary">
            <Search size={15}/>
          </span>
        </div>
        <Input
          type="text"
          placeholder="Search products, suppliers, requisitions..."
          className={clsx(
            'w-full border-0 bg-transparent py-3 pl-14 pr-12 text-sm text-slate-700 placeholder:text-slate-400',
            'focus:bg-white focus:outline-none focus:ring-0'
          )}
          name="query"
          id="query"
          autoComplete="true"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X size={15}/>
            </button>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">Find</span>
          )}
        </div>
      </div>
    </div>
  );
}
