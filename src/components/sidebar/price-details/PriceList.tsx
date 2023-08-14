import PriceItem from '@/components/sidebar/price-details/PriceItem';

export default function PriceList({prices}) {
  return (
    <>
      <ul>
        {prices.map(price => <li key={prices.id}>
          <PriceItem price={price.attributes}/>
        </li>)}
      </ul>
    </>
  );
}