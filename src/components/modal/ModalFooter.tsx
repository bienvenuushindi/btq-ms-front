import {Button} from "@/components/ui/button";

export default function ModalFooter({closeModal, children}:any) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-white p-3 sm:p-6">
      {children}
      {closeModal && <Button size="sm" variant={'destructive'} data-modal-hide="defaultModal"  onClick={closeModal}
              className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200">Cancel
      </Button>}
    </div>
  )
}
