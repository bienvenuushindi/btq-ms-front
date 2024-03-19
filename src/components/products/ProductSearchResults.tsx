import clsx from 'clsx';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export default function ProductSearchResults({url, setItems}) {
  const {data: products = [], meta, links, error, isLoading} = useFetcher(API_ENDPOINTS.PRODUCTS)
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
              {product.name}
              <ul className="ml-3">
                {product.details.map(item => <li key={clsx(item.id)}>
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