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
      <div className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition focus-within:border-slate-400 focus-within:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:rounded-[22px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition group-focus-within:bg-orange-50 group-focus-within:text-primary sm:h-8 sm:w-8">
            <Search size={15}/>
          </span>
        </div>
        <Input
          type="text"
          placeholder="Search products, suppliers, requisitions..."
          className={clsx(
            'w-full border-0 bg-transparent py-2.5 pl-12 pr-10 text-[13px] text-slate-700 placeholder:text-slate-400 sm:py-3 sm:pl-14 sm:pr-12 sm:text-sm',
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
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:h-8 sm:w-8"
              aria-label="Clear search"
            >
              <X size={15}/>
            </button>
          ) : (
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-300 sm:text-[11px] sm:tracking-[0.12em]">Find</span>
          )}
        </div>
      </div>
    </div>
  );
}
