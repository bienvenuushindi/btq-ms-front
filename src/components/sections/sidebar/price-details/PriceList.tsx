import PriceItem from '@/components/sections/sidebar/price-details/PriceItem';

export default function PriceList({prices, productDetailId, onRefresh}) {
  return (
    <>
      <ul className="p-2">
        {prices.map((price,index) => <li key={`price-${index}}`}>
          <PriceItem
            details={price.price_details}
            supplier={price.supplier}
            productDetailId={productDetailId}
            onRefresh={onRefresh}
          />
        </li>)}
      </ul>
    </>
  );
}
