import ProductItem from '@/components/products/ProductItem';
export default function ProductList({products}){
  return(
    <ul className="grid grid-cols-4 gap-1">
      {products && products.map(product =>
        <li key={product.id} className="w-full">
          <ProductItem product={product}/>
        </li>)}
    </ul>
  )
}