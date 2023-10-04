export default function RequisitionItem({requisition}){

  return(

      <ul className="grid grid-cols-2 space-x-2">
        <li><span>Schedule Date: </span> {requisition.date}</li>
        {/*<li><span>Contains: </span> {requisition_items.attributes.count_products} Product(s)</li>*/}
        <li><span>Bought: </span>{requisition.count_products_bought} Product(s)</li>
        <li><span>Total Price: </span>{requisition.total_price}</li>
        <li><span>Currency: </span>{requisition.price_currency}</li>
      </ul>
  )
}
