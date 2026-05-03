import React from 'react';
import Button from '@/components/utils/Button';
import {ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight} from 'react-feather';

const getPageFromUrl = (url?: string) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const pageValue = parsedUrl.searchParams.get('page[number]') || parsedUrl.searchParams.get('page');
    const parsedPage = Number(pageValue);
    return Number.isNaN(parsedPage) ? null : parsedPage;
  } catch (error) {
    return null;
  }
};

const Paginate = ({ meta, links, setUrl }) => {
  const iconMap = {
    first: <ChevronsLeft size={20} />,
    prev: <ArrowLeft size={20} />,
    next: <ArrowRight size={20} />,
    last: <ChevronsRight size={20} />,
  };

  const currentPage = getPageFromUrl(links?.self) || Number(meta?.page || 1);
  const totalPages = Number(meta?.pages || 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 md:text-sm">
        Page {currentPage} of {totalPages}
      </div>
      {Object.keys(links).map((key) => {
        // Determine if the button should be displayed
        const shouldDisplayButton =
          key === 'self' ||
          (meta['pages'] === 2 && (key === 'last' || key === 'first'));
        return shouldDisplayButton ? null : (
          <Button onClick={() => setUrl(links[key])}
                  key={key}
                  size="small" intent="secondary">
            {iconMap[key]}
          </Button>
        );
      })}
    </div>
  );
};

export default Paginate;
