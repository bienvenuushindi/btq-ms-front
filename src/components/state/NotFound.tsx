import React from 'react';
import {Search} from 'react-feather';

export default function NotFound({
  title = 'Nothing to show yet',
  message = 'We could not find the details for this section right now.',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex min-h-36 w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-3 py-6 text-center sm:min-h-[180px] sm:rounded-[20px] sm:px-6 sm:py-8">
      <div className="max-w-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-[0_10px_25px_rgba(15,23,42,0.08)] ring-1 ring-slate-200">
          <Search size={18}/>
        </div>
        <h3 className="mt-3 text-sm font-semibold text-slate-900 sm:mt-4 sm:text-base">{title}</h3>
        <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">{message}</p>
      </div>
    </div>
  );
}
