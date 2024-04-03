import {createContext, useState} from 'react';
export const RequisitionContext = createContext(null);

export default function RequisitionProvider({children}:{
  children: React.ReactNode
}){
  const [currency,setCurrency] = useState(null);
  const [requisitionID,setRequisitionID] = useState(null);
  const [requisition,setRequisition] = useState(null);
  return (
    <RequisitionContext.Provider value={{currency, setCurrency, requisitionID,setRequisitionID, setRequisition, requisition}}>
      {children}
    </RequisitionContext.Provider>
  )
}
