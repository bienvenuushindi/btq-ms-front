import Button from '@/components/Button';
import {X} from 'react-feather'
export default function ModalHeader({title, closeModal}) {
  return (
    <div className="flex items-start justify-between p-4 border-b rounded-t -dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <Button  size="small" intent="text"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
        <X size={20}/>
      </Button>
    </div>
  );
}