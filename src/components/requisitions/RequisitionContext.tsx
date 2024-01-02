import {createContext, useState} from 'react';
export const RequisitionContext = createContext(null);

export default function RequisitionProvider({children}){
  const [currency,setCurrency] = useState(null);
  return (
    <RequisitionContext.Provider value={{currency, setCurrency}}>
      {children}
    </RequisitionContext.Provider>
  )
}
