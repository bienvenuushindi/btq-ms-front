import Modal from 'react-modal';

export default function ModalContainer({isOpen, onRequestClose, children}:any) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-[2px]"
      className={`fixed inset-0 z-[80] overflow-y-auto px-4 py-6 md:px-6 md:py-10 ${isOpen ? 'visible' : 'hidden'}`}
      ariaHideApp={false}

    >
      <div className="flex min-h-full items-center justify-center">
        {children}
      </div>
    </Modal>
  );
}
