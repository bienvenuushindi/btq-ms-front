import React from 'react';
import Button from '@/components/Button';
import {ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight} from 'react-feather';


const Paginate = ({ meta, links, setUrl }) => {
  const iconMap = {
    first: <ChevronsLeft size={20} />,
    prev: <ArrowLeft size={20} />,
    next: <ArrowRight size={20} />,
    last: <ChevronsRight size={20} />,
  };
  return (
    <div className="flex gap-3">
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
