import Button from '@/components/utils/Button';
import clsx from 'clsx';

const Accordion = ({id,title, content, isOpen, toggleAccordion, className}) => {
  return (
    <div className={clsx("pl-1 flex flex-col items-start  w-full rounded", className)}>
      <Button
        size="small"
        intent={'text'}
        className="flex justify-between items-start w-full rounded px-2"
        onClick={() => toggleAccordion(id)}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform border px-2 text-lg rounded text-lightBlue-200`}>
          &#9660;
        </span>
      </Button>
      {isOpen && <div className="p-2 w-full">{content}</div>}
    </div>
  );
};

export default Accordion;