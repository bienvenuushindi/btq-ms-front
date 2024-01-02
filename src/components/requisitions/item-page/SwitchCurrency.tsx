import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ConvertCurrency from '@/components/requisitions/item-page/ConvertCurrency';

export default function SwitchCurrency({modalIsOpen, setIsOpen,productCurrency,requisitionCurrency,priceToConvert,convertFunc,currencies}){
  const closeModal = () => setIsOpen(false);
  return (
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalContent>
          <ModalHeader
            closeModal={closeModal}
            title={" Ooops !!! It seems your product's currency doesn't match your requisition currency. Please convert then proceed"}
            titleClassName="text-center px-2"
          />
          <ModalBody>
            <ConvertCurrency
              currencies={currencies}
              productCurrency={productCurrency}
              requisitionCurrency={requisitionCurrency}
              priceToConvert={priceToConvert}
              convertFunc={convertFunc}
              setIsOpen={setIsOpen}
            />
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    )
}