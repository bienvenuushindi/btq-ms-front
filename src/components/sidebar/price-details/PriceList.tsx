import PriceItem from '@/components/sidebar/price-details/PriceItem';

export default function PriceList({prices}) {
  return (
    <>
      <ul>
        {prices.map(price => <li key={`${price.id}-${Math.random()}`}>
          <PriceItem price={price.attributes}/>
        </li>)}
      </ul>
    </>
  );
}