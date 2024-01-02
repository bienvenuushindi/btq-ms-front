export default function ModalContent({children}){
  return (
    <div className="relative bg-white rounded -dark:bg-gray-700 ">
      {children}
    </div>
  );
}