import Modal from 'react-modal';

export default function ModalContainer({isOpen, onRequestClose, children}:any) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 z-50 bg-[rgba(0,0,0,.6)] "
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}
      ariaHideApp={false}

    >
      {children}
    </Modal>
  );
}