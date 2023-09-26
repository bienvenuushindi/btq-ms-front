import Button from '@/components/Button';
import clsx from 'clsx';

const Accordion = ({id,title, content, isOpen, toggleAccordion}) => {
  return (
    <div className={clsx("pl-1 flex flex-col items-center w-full rounded")}>
      <Button
        size="small"
        intent={'text'}
        className="flex justify-between items-start w-full rounded px-2"
        onClick={() => toggleAccordion(id)}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform border px-1 rounded bg-lightBlue-200 text-white`}>
          &#9660;
        </span>
      </Button>
      {isOpen && <div className="p-2">{content}</div>}
    </div>
  );
};

export default Accordion;