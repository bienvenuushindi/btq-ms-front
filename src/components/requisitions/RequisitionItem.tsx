import InfoItem from '@/components/InfoItem';

export default function RequisitionItem({requisition}){

  return(

      <ul className="grid grid-cols-2">
        <li><InfoItem label="Schedule Date" value={requisition.date}/></li>
        <li><InfoItem label="Bought" value={requisition.count_products_bought+' Product(s)'}/></li>
        <li><InfoItem label="Total Price" value={requisition.total_price}/></li>
        <li><InfoItem label="Currency" value={requisition.price_currency}/></li>
      </ul>
  )
}
