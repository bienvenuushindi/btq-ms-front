import {useFetcher} from "@/app/hooks/useFetcher";
import DataLoading from "@/components/state/Loading";
import React from "react";

export default function RequisitionProductSearchResults({url, setItems, oldItems}) {
  const {data: products = [], error, isLoading} = useFetcher(url)
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
      {isLoading ? (
        <DataLoading/>
      ) : error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We couldn&apos;t load products right now. Try adjusting the search or refreshing the list.
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          No matching products found. Try a different search term.
        </div>
      ) : (
        products.map((product, index) => <div key={"product-" + product.id} className="p-2">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-gray-500">{index})</span>
            {product.name}
          </h3>
          <ul className="space-y-2">
            {product.details.map((item) => (
                <li
                    key={item.id}
                    className="flex items-center justify-between p-2 bg-white rounded-lg transition-shadow"
                >
                  {/* Checkbox and Item */}
                  <div className="flex items-center space-x-2">
                    {oldItems.indexOf(item.id) !== -1 ? (
                        <>
                          <input
                              type="checkbox"
                              className="form-checkbox text-gray-400 cursor-not-allowed"
                              checked={true}
                              disabled={true}
                              value={JSON.stringify(item)}
                          />
                          <label className="text-gray-400">{item.name}</label>
                          <span className="text-xs text-gray-500">(already included)</span>
                        </>
                    ) : (
                        <>
                          <input
                              type="checkbox"
                              className="form-checkbox text-blue-500 focus:ring focus:ring-blue-300"
                              onChange={handleChange}
                              value={JSON.stringify(item)}
                          />
                          <label className="text-gray-800">{item.name}</label>
                        </>
                    )}
                  </div>
                </li>
            ))}
          </ul>
        </div>)
      )}
    </>
  );
}
