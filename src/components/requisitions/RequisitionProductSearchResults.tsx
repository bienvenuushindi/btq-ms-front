import clsx from 'clsx';
import {useFetcher} from "@/app/hooks/useFetcher";
import DataLoading from "@/components/state/Loading";
import React from "react";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";

export default function RequisitionProductSearchResults({url, setItems, oldItems}) {
  const {data: products = [], meta, links, error, isLoading} = useFetcher(url)
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
      <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
        { products.map((product, index) => <div key={"product-"+product.id}>{index})
              {product.name}
              <ul className="ml-3">
                {product.details.map(item => <li key={clsx(item.id)}>
                  <div className={"flex"}>
                    {
                      (oldItems.indexOf(item.id) !== -1) ?
                          <>
                            <input type="checkbox" checked={true} disabled={true} value={JSON.stringify(item)}/>
                            <label> {item.name}</label>
                            <span>(already included)</span>
                          </>
                          :
                          <>
                            <input type="checkbox" onChange={handleChange} value={JSON.stringify(item)}/>
                            <label> {item.name}</label>
                          </>
                    }
                  </div>
                </li>)}
              </ul>
            </div>)
        }
      </DataWrapper>
    </>
  );
}