import Button from '@/components/utils/Button';
import clsx from 'clsx';

const Accordion = ({id,title, content, isOpen, toggleAccordion, className}) => {
  return (
    <div className={clsx("flex w-full flex-col items-start rounded-[20px]", className)}>
      <Button
        size="small"
        intent={'text'}
        className="flex w-full items-start justify-between rounded-[18px] px-3 py-3 text-left"
        onClick={() => toggleAccordion(id)}
      >
        <span className="min-w-0 flex-1">{title}</span>
        <span className={`ml-3 shrink-0 transform rounded-full border border-slate-200 bg-white px-2 py-1 text-lg text-lightBlue-200 transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          &#9660;
        </span>
      </Button>
      {isOpen && <div className="w-full px-1 pb-1 pt-2">{content}</div>}
    </div>
  );
};

export default Accordion;
