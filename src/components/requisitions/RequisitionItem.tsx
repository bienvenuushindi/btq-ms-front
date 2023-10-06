import InfoItem from '@/components/InfoItem';
import {Calendar, CreditCard, Globe, Layers} from 'react-feather';

export default function RequisitionItem({requisition}) {

  return (
    <ul className="grid grid-cols-2">
      <li>
        <InfoItem
        label={<><Calendar size={16}/>Schedule Date</>}
        value={requisition.date}/>
      </li>
      <li>
        <InfoItem
          label={<><CreditCard size={16}/> Bought</>}
          value={requisition.count_products_bought + ' Product(s)'}/>
      </li>
      <li>
        <InfoItem
          label={<><Layers size={16}/> Total Price</>}
          value={requisition.total_price}/>
      </li>
      <li>
        <InfoItem
          label={<><Globe size={16}/> Currency</>}
          value={requisition.price_currency}/>
      </li>
    </ul>
  )
}
