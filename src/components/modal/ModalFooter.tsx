import Button from '@/components/Button';

export default function ModalFooter({closeModal, children}:any) {
  return (
    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b -dark:border-gray-600">
      {children}
      {closeModal && <Button size="small" intent={'default'} data-modal-hide="defaultModal"  onClick={closeModal}
              className="px-2 py-1 mr-2">Cancel
      </Button>}
    </div>
  )
}