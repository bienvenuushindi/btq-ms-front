import Button from '@/components/Button';

const Accordion = ({id,title, content, isOpen, toggleAccordion}) => {
  return (
    <div className="p-1 flex flex-col  items-center  w-full">
      <Button
        size="small"
        intent={'text'}
        className="flex justify-between items-center w-full  rounded"
        onClick={() => toggleAccordion(id)}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span className={`transform ${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform`}>
          &#9660;
        </span>
      </Button>
      {isOpen && <div className="p-2">{content}</div>}
    </div>
  );
};

export default Accordion;