import {useProducts} from '@/app/hooks/useProducts';
import clsx from 'clsx';
import Input from '@/components/Input';

export default function ProductSearchResults({url, setItems}) {
  const {data: products = [], meta, links, error, isLoading} = useProducts(url);
  function handleChange(e) {
    const targetItem = JSON.parse(e.target.value)
    if (e.target.checked) {
      setItems((prev) => {
        const filter = prev.find((item) => item.id == targetItem.id)
        if (filter) return prev
        return [...prev, targetItem]
      })
    } else {
      setItems((prev) => prev.filter(item => item.id !== targetItem.id))
    }
  }

  return (
    <>
      {
        isLoading && !error ? (<div>Loading...</div>) :
          error ? <div>Failed to load</div> :
            products.map((product, index) => <div key={product.id}>{index})
              {product.attributes.name}
              <ul className="ml-3">
                {product.attributes.details.map(item => <li key={clsx(item.id)}>
                  <div className={" flex"}>
                    <input type="checkbox" onChange={handleChange} value={JSON.stringify(item)}/>
                    <label> {item.name}</label>
                  </div>
                </li>)}
              </ul>
            </div>)
      }
    </>
  );
}