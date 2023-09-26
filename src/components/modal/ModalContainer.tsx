import Modal from 'react-modal';

export default function ModalContainer({isOpen, onRequestClose, children}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
      className="relative w-full max-w-2xl max-h-full focus:outline-0"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}