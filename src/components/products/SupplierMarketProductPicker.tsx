'use client';

import React, {useState} from 'react';
import {CheckCircle, Layers, Minus, Package, PlusCircle} from 'react-feather';
import Button from '@/components/utils/Button';
import Badge from '@/components/utils/Badge';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import {SearchBar} from '@/components/SearchBar';
import {useFetcher} from '@/app/hooks/useFetcher';
import {API_ENDPOINTS, send} from '@/lib/api';
import {updateUrl} from '@/lib/helper';
import toastShow from '@/components/toast/toast-selector';
import {revalidateCache} from '@/lib/cache';

const quantityTypes = [
  {code: 'unit', label: 'Unit'},
  {code: 'dozen', label: 'Group'},
  {code: 'box', label: 'Box'},
];

const emptyPriceState = (currency = 'usd') => ({
  supplier_status: true,
  currency,
  prices: {},
  activeQuantityTypes: {},
});

type PriceStateMap = Record<string, ReturnType<typeof emptyPriceState>>;

const getProductDetails = (product) => product.product_details || product.details || [];

const mergeDetail = (product, detail) => ({
  ...detail,
  product_id: product.id,
  product_name: product.name,
  name: detail.name || [product.name, detail.size].filter(Boolean).join(' - '),
});

function MarketSearchResults({url, selectedItems, setSelectedItems}) {
  const {data: products = [], error, isLoading} = useFetcher(url);
  const selectedIds = selectedItems.map((item) => item.id);

  const toggleItem = (product, detail, checked) => {
    const item = mergeDetail(product, detail);
    if (checked) {
      setSelectedItems((prev) => prev.some((selected) => selected.id === item.id) ? prev : [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((selected) => selected.id !== item.id));
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        Searching market products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        We could not load market products right now. Try another search or refresh.
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
        No market products found. Try a different product name.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50/70 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                <span>Result {index + 1}</span>
                <span className="text-slate-300">-</span>
                <span>{getProductDetails(product).length} variant{getProductDetails(product).length === 1 ? '' : 's'}</span>
              </div>
              <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900">
                <Package size={17} className="text-sky-600"/>
                <span className="truncate">{product.name}</span>
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              <Layers size={14}/>
              Choose variants
            </span>
          </div>
          <ul className="space-y-3 p-4">
            {getProductDetails(product).map((detail) => {
              const isSelected = selectedIds.includes(detail.id);
              const detailName = detail.name || [product.name, detail.size].filter(Boolean).join(' - ');

              return (
                <li
                  key={detail.id}
                  className="rounded-[20px] border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                      checked={isSelected}
                      onChange={(event) => toggleItem(product, detail, event.target.checked)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {detailName}
                        </p>
                        <Badge variant="success" size="small">Approved</Badge>
                        {isSelected ? (
                          <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                            Selected
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Variant ID: #{detail.id}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function PricingModal({
  isOpen,
  onClose,
  selectedItems,
  priceState,
  setPriceState,
  defaultCurrency,
  onSave,
  isSubmitting,
}) {
  const updateItem = (detailId, updater) => {
    setPriceState((prevState) => ({
      ...prevState,
      [detailId]: updater(prevState[detailId] || emptyPriceState(defaultCurrency)),
    }));
  };

  return (
    <ModalContainer isOpen={isOpen} onRequestClose={onClose}>
      <ModalContent>
        <ModalHeader closeModal={onClose} title="Add Prices"/>
        <ModalBody>
          <div className="mb-4 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
            Prices are optional. You can save these variants now and add prices later from your shop.
          </div>
          <div className="space-y-3">
            {selectedItems.map((item) => {
              const state = priceState[item.id] || emptyPriceState(defaultCurrency);

              return (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">Variant ID: #{item.id}</p>
                    </div>
                    <button
                      type="button"
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${state.supplier_status ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'}`}
                      onClick={() => updateItem(item.id, (prev) => ({
                        ...prev,
                        supplier_status: !prev.supplier_status,
                      }))}
                    >
                      {state.supplier_status ? 'Shop active' : 'Shop inactive'}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="text-sm font-semibold text-slate-600">Currency</label>
                    <select
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                      value={state.currency || defaultCurrency}
                      onChange={(event) => updateItem(item.id, (prev) => ({
                        ...prev,
                        currency: event.target.value,
                      }))}
                    >
                      {['fc', 'rw', 'ugx', 'usd'].map((currency) => (
                        <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 grid gap-2 md:grid-cols-3">
                    {quantityTypes.map((quantityType) => {
                      const isActive = Boolean(state.activeQuantityTypes?.[quantityType.code]);
                      return (
                        <div key={quantityType.code} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={isActive}
                              onChange={(event) => updateItem(item.id, (prev) => ({
                                ...prev,
                                activeQuantityTypes: {
                                  ...prev.activeQuantityTypes,
                                  [quantityType.code]: event.target.checked,
                                },
                              }))}
                            />
                            {quantityType.label}
                          </label>
                          {isActive ? (
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                              placeholder={`${quantityType.label} price`}
                              value={state.prices?.[quantityType.code] || ''}
                              onChange={(event) => updateItem(item.id, (prev) => ({
                                ...prev,
                                prices: {
                                  ...prev.prices,
                                  [quantityType.code]: event.target.value,
                                },
                              }))}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter closeModal={onClose}>
          <Button
            onClick={onSave}
            disabled={isSubmitting}
            size="small"
            intent="primary"
            className="rounded-2xl px-4 py-2 text-sm font-semibold"
          >
            {isSubmitting ? 'Saving...' : 'Save variants'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}

export default function SupplierMarketProductPicker({isOpen, onClose, onSaved = null}) {
  const {data: currentUser} = useFetcher(API_ENDPOINTS.CURRENT_USER);
  const defaultCurrency = currentUser?.default_currency || 'usd';
  const [searchUrl, setSearchUrl] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [priceState, setPriceState] = useState<PriceStateMap>({});
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateParams = (newFilters) => {
    const query = newFilters?.q?.trim?.() || '';
    setSearchUrl(query ? updateUrl(API_ENDPOINTS.SEARCH_PRODUCT_MARKET, {q: query}) : null);
  };

  const resetState = () => {
    setSearchUrl(null);
    setSelectedItems([]);
    setPriceState({});
    setPricingModalOpen(false);
  };

  const closeSelectionModal = () => {
    resetState();
    onClose();
  };

  const removeSelectedItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
    setPriceState((prev) => {
      const {[String(itemId)]: omitted, ...rest} = prev;
      return rest;
    });
  };

  const saveSelection = async () => {
    if (selectedItems.length === 0) {
      toastShow('error', 'Select at least one market variant');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();

    selectedItems.forEach((item, index) => {
      const state = priceState[item.id] || emptyPriceState(defaultCurrency);
      formData.append(`shop_selection[product_details][${index}][product_detail_id]`, String(item.id));
      formData.append(`shop_selection[product_details][${index}][currency]`, state.currency || defaultCurrency);
      formData.append(`shop_selection[product_details][${index}][supplier_status]`, String(state.supplier_status));

      quantityTypes.forEach((quantityType) => {
        const isActive = state.activeQuantityTypes?.[quantityType.code];
        const price = state.prices?.[quantityType.code];
        if (isActive && Number(price) > 0) {
          formData.append(`shop_selection[product_details][${index}][prices][${quantityType.code}]`, price);
        }
      });
    });

    try {
      await send('/supplier_product_details/bulk', formData);
      await revalidateCache({prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_MARKET, API_ENDPOINTS.SEARCH_PRODUCT_MARKET, API_ENDPOINTS.PRODUCT_STATS]});
      toastShow('success', 'Market variants added to your shop');
      if (onSaved) {
        await Promise.resolve(onSaved());
      }
      resetState();
      onClose();
    } catch (error) {
      toastShow('error', error instanceof Error ? error.message : 'Could not add market variants');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalContainer isOpen={isOpen && !pricingModalOpen} onRequestClose={closeSelectionModal}>
        <ModalContent>
          <ModalHeader closeModal={closeSelectionModal} title="Add From Market"/>
          <ModalBody>
            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <SearchBar onSearch={updateParams}/>
                <div className="mt-4">
                  {searchUrl ? (
                    <MarketSearchResults
                      url={searchUrl}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                  ) : (
                    <span className="text-sm text-slate-500">Search market products by name, then select the variants you want to add to your shop.</span>
                  )}
                </div>
              </div>

              {selectedItems.length > 0 ? (
                <div className="space-y-3 rounded-[24px] border border-slate-200 bg-orange-50/50 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                  <div>
                    <span className="block text-sm font-semibold text-slate-800">{selectedItems.length} variant(s) selected</span>
                    <span className="text-xs text-slate-500">You can save now without prices and add prices later from your shop.</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-white px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                              <CheckCircle size={12}/>
                              Ready
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSelectedItem(item.id)}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-700 transition hover:border-amber-300 hover:bg-amber-100"
                          aria-label={`Remove ${item.name}`}
                          title={`Remove ${item.name}`}
                        >
                          <Minus size={16}/>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter closeModal={closeSelectionModal}>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={saveSelection}
                disabled={isSubmitting || selectedItems.length === 0}
                size="small"
                intent="secondary"
                className="rounded-2xl px-4 py-2 text-sm font-semibold"
              >
                {isSubmitting ? 'Saving...' : 'Save without prices'}
              </Button>
              <Button
                onClick={() => {
                  if (selectedItems.length === 0) {
                    toastShow('error', 'Select at least one market variant');
                    return;
                  }
                  setPricingModalOpen(true);
                }}
                disabled={selectedItems.length === 0}
                size="small"
                intent="primary"
                className="rounded-2xl px-4 py-2 text-sm font-semibold"
              >
                <PlusCircle size={16}/>
                <span className="ml-2">Add price and save</span>
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        selectedItems={selectedItems}
        priceState={priceState}
        setPriceState={setPriceState}
        defaultCurrency={defaultCurrency}
        onSave={saveSelection}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
