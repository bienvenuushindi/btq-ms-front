'use client';

import React, {useMemo, useState} from 'react';
import {PlusCircle, Trash2} from 'react-feather';
import Button from '@/components/utils/Button';
import Badge from '@/components/utils/Badge';
import DeleteAlert from '@/components/DeleteAlert';
import ModalContainer from '@/components/modal/ModalContainer';
import ModalContent from '@/components/modal/ModalContent';
import ModalHeader from '@/components/modal/ModalHeader';
import ModalBody from '@/components/modal/ModalBody';
import ModalFooter from '@/components/modal/ModalFooter';
import {API_ENDPOINTS, deleteItem, send} from '@/lib/api';
import toastShow from '@/components/toast/toast-selector';
import {revalidateCache} from '@/lib/cache';

const quantityTypes = [
  {code: 'unit', label: 'Unit'},
  {code: 'dozen', label: 'Group'},
  {code: 'box', label: 'Box'},
];

const buildInitialState = (details = [], defaultCurrency = 'usd') => (
  details.reduce((acc, detail) => {
    const prices = (detail.shop_prices || []).reduce((priceAcc, priceDetail) => ({
      ...priceAcc,
      [priceDetail.quantity_type]: priceDetail.price,
    }), {});

    acc[detail.id] = {
      selected: Boolean(detail.supplier_status !== undefined && detail.supplier_status !== null),
      supplier_status: detail.supplier_status ?? true,
      currency: detail.shop_prices?.[0]?.currency || defaultCurrency,
      prices,
      activeQuantityTypes: Object.keys(prices).reduce((typeAcc, quantityType) => ({
        ...typeAcc,
        [quantityType]: true,
      }), {}),
    };
    return acc;
  }, {})
);

export default function SupplierShopVariantPicker({
  product,
  currentUser,
  onSaved = null,
  isOpen = null,
  onClose = null,
  showTrigger = true,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variantToRemove, setVariantToRemove] = useState(null);
  const productDetails = product?.product_details;
  const details = useMemo(() => productDetails || [], [productDetails]);
  const defaultCurrency = currentUser?.default_currency || 'usd';
  const initialState = useMemo(
    () => buildInitialState(details, defaultCurrency),
    [details, defaultCurrency]
  );
  const [variantState, setVariantState] = useState(initialState);
  const actualIsOpen = isOpen ?? modalIsOpen;

  const closeModal = () => {
    setModalIsOpen(false);
    setVariantState(buildInitialState(details, defaultCurrency));
    if (onClose) {
      onClose();
    }
  };

  const updateVariant = (detailId, updater) => {
    setVariantState((prevState) => ({
      ...prevState,
      [detailId]: updater(prevState[detailId] || {
        selected: false,
        supplier_status: true,
        currency: defaultCurrency,
        prices: {},
        activeQuantityTypes: {},
      }),
    }));
  };

  const selectedDetails = details.filter((detail) => variantState[detail.id]?.selected);

  const removeVariant = async () => {
    if (!variantToRemove) return;

    try {
      await deleteItem(`/supplier_product_details/product_detail/${variantToRemove.id}`);
      await revalidateCache({
        prefixes: [API_ENDPOINTS.PRODUCTS, API_ENDPOINTS.PRODUCT_STATS, API_ENDPOINTS.PRODUCT_MARKET],
        keys: product?.id ? [API_ENDPOINTS.PRODUCT_BY_ID(product.id)] : [],
      });
      setVariantState((prevState) => ({
        ...prevState,
        [variantToRemove.id]: {
          selected: false,
          supplier_status: true,
          currency: defaultCurrency,
          prices: {},
          activeQuantityTypes: {},
        },
      }));
      toastShow('success', 'Variant removed from your shop');
      if (onSaved) {
        await Promise.resolve(onSaved());
      }
    } catch (error) {
      toastShow('error', error instanceof Error ? error.message : 'Could not remove variant from your shop');
    } finally {
      setVariantToRemove(null);
    }
  };

  const saveSelection = async () => {
    if (selectedDetails.length === 0) {
      toastShow('error', 'Select at least one product variant');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();

    selectedDetails.forEach((detail, index) => {
      const state = variantState[detail.id];
      formData.append(`shop_selection[product_details][${index}][product_detail_id]`, String(detail.id));
      formData.append(`shop_selection[product_details][${index}][currency]`, state.currency || defaultCurrency);
      formData.append(`shop_selection[product_details][${index}][supplier_status]`, String(state.supplier_status));

      quantityTypes.forEach((quantityType) => {
        const isActive = state.activeQuantityTypes?.[quantityType.code];
        const price = state.prices?.[quantityType.code];
        if (isActive && Number(price) > 0) {
          formData.append(
            `shop_selection[product_details][${index}][prices][${quantityType.code}]`,
            price
          );
        }
      });
    });

    try {
      await send('/supplier_product_details/bulk', formData);
      await revalidateCache({
        prefixes: [API_ENDPOINTS.PRODUCTS],
        keys: product?.id ? [API_ENDPOINTS.PRODUCT_BY_ID(product.id)] : [],
      });
      toastShow('success', 'Product variants saved to your shop');
      if (onSaved) {
        await Promise.resolve(onSaved());
      }
      closeModal();
    } catch (error) {
      toastShow('error', error instanceof Error ? error.message : 'Could not save product variants');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showTrigger ? (
        <Button
          onClick={() => setModalIsOpen(true)}
          size="small"
          intent="primary"
          className="oasis-button flex items-center gap-1 rounded-2xl px-4 py-2 text-sm font-semibold"
        >
          <PlusCircle color="#FFFFFF" size={20}/>
          <span className="text-neutral-50">Add variants to shop</span>
        </Button>
      ) : null}
      <ModalContainer isOpen={Boolean(actualIsOpen)} onRequestClose={closeModal}>
        <ModalContent>
          <ModalHeader closeModal={closeModal} title="Add Variants To Shop"/>
          <ModalBody>
            <div className="space-y-3">
              {details.map((detail) => {
                const state = variantState[detail.id] || {};
                return (
                  <div key={detail.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4"
                        checked={Boolean(state.selected)}
                        onChange={(event) => updateVariant(detail.id, (prev) => ({
                          ...prev,
                          selected: event.target.checked,
                        }))}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-slate-900">{product.name} - {detail.size}</span>
                        <span className="mt-1 flex flex-wrap gap-2">
                          <Badge variant={detail.approval_status === 'approved' ? 'success' : 'warning'} size="small">
                            {detail.approval_status?.replace('_', ' ') || 'pending review'}
                          </Badge>
                          {detail.supplier_status !== undefined && detail.supplier_status !== null ? (
                            <Badge variant={detail.supplier_status ? 'success' : 'danger'} size="small">
                              Shop {detail.supplier_status ? 'active' : 'inactive'}
                            </Badge>
                          ) : null}
                        </span>
                      </span>
                    </label>

                    {state.selected ? (
                      <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="text-sm font-semibold text-slate-600">Shop status</label>
                          <button
                            type="button"
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${state.supplier_status ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-200' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'}`}
                            onClick={() => updateVariant(detail.id, (prev) => ({
                              ...prev,
                              supplier_status: !prev.supplier_status,
                            }))}
                          >
                            {state.supplier_status ? 'Active' : 'Inactive'}
                          </button>
                          <select
                            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                            value={state.currency || defaultCurrency}
                            onChange={(event) => updateVariant(detail.id, (prev) => ({
                              ...prev,
                              currency: event.target.value,
                            }))}
                          >
                            {['fc', 'rw', 'ugx', 'usd'].map((currency) => (
                              <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                            ))}
                          </select>
                          <Button
                            type="button"
                            size="small"
                            intent="danger"
                            className="rounded-2xl px-3 py-2 text-xs font-semibold"
                            onClick={() => setVariantToRemove(detail)}
                          >
                            <Trash2 size={14}/>
                            <span className="ml-2">Remove variant</span>
                          </Button>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                          {quantityTypes.map((quantityType) => {
                            const isActive = Boolean(state.activeQuantityTypes?.[quantityType.code]);
                            return (
                              <div key={quantityType.code} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                  <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(event) => updateVariant(detail.id, (prev) => ({
                                      ...prev,
                                      activeQuantityTypes: {
                                        ...prev.activeQuantityTypes,
                                        [quantityType.code]: event.target.checked,
                                      },
                                      prices: event.target.checked ? prev.prices : {
                                        ...prev.prices,
                                        [quantityType.code]: '',
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
                                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                                    placeholder={`${quantityType.label} price`}
                                    value={state.prices?.[quantityType.code] || ''}
                                    onChange={(event) => updateVariant(detail.id, (prev) => ({
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
                    ) : null}
                  </div>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter closeModal={closeModal}>
            <Button
              onClick={saveSelection}
              disabled={isSubmitting}
              size="small"
              intent="primary"
              className="rounded-2xl px-4 py-2 text-sm font-semibold"
            >
              {isSubmitting ? 'Saving...' : `Save ${selectedDetails.length || ''} variants`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
      {variantToRemove ? (
        <DeleteAlert
          onCancel={() => setVariantToRemove(null)}
          onDelete={removeVariant}
          show={Boolean(variantToRemove)}
          message={`Remove ${product.name} - ${variantToRemove.size} from your shop? This will remove your local prices and status for this variant.`}
        />
      ) : null}
    </>
  );
}
