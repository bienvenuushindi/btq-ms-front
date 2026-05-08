import {useFetcher} from "@/app/hooks/useFetcher";
import DataLoading from "@/components/state/Loading";
import {CheckCircle, Layers, Package} from 'react-feather';
import React from "react";

export default function RequisitionProductSearchResults({url, setItems, oldItems, items = []}) {
  const {data: products = [], error, isLoading} = useFetcher(url)

  const selectedIds = items.map((item) => item.id);

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
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={"product-" + product.id}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/70 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>Result {index + 1}</span>
                    <span className="text-slate-300">•</span>
                    <span>{product.details.length} variant{product.details.length === 1 ? '' : 's'}</span>
                  </div>
                  <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900">
                    <Package size={17} className="text-sky-600" />
                    <span className="truncate">{product.name}</span>
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                  <Layers size={14} />
                  Choose variants
                </span>
              </div>
              <ul className="space-y-3 p-4">
                {product.details.map((item) => {
                  const alreadyIncluded = oldItems.indexOf(item.id) !== -1;
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <li
                      key={item.id}
                      className="rounded-[20px] border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                    >
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400 disabled:cursor-not-allowed disabled:text-slate-300"
                          checked={alreadyIncluded || isSelected}
                          disabled={alreadyIncluded}
                          onChange={handleChange}
                          value={JSON.stringify(item)}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                            {alreadyIncluded ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                                <CheckCircle size={12} />
                                Already in requisition
                              </span>
                            ) : isSelected ? (
                              <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                                Selected
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Variant ID: #{item.id}
                          </p>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
