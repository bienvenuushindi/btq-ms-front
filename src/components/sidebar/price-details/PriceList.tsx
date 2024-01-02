import PriceItem from '@/components/sidebar/price-details/PriceItem';

export default function PriceList({prices}) {
  return (
    <>
      <ul className="p-2">
        {prices.map(price => <li key={`price-${price.id}}`}>
          <PriceItem details={price.attributes.price_details} supplier={price.attributes.supplier}/>
        </li>)}
      </ul>
    </>
  );
}