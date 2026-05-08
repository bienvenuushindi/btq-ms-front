import { useState } from 'react';
import {API_ENDPOINTS, send} from '@/lib/api';
import { updateUrl } from '@/lib/helper';
import {revalidateCache} from '@/lib/cache';

export function useRequisitionForm({ requisitionID, revalidate, closeModal }) {
    const [items, setItems] = useState([]);
    const [url, setUrl] = useState<string | null>(null);
    const [error, setError] = useState('');

    const updateParams = (newFilters) => {
        const query = newFilters?.q?.trim?.() || '';
        if (!query) {
            setUrl(null);
            return;
        }

        setUrl(updateUrl(API_ENDPOINTS.SEARCH_PRODUCTS, {q: query}));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        for (let i = 0; i < items.length; i++) {
            formData.append('requisition[product_detail_ids][]', items[i].id);
        }
        try {
            await send(`/requisitions/${requisitionID}/add_products`, formData);
            await revalidateCache({
                keys: [API_ENDPOINTS.REQUISITION_BY_ID(requisitionID)],
                prefixes: [API_ENDPOINTS.REQUISITIONS, API_ENDPOINTS.RECENT_REQUISITIONS],
            });
            closeModal();
            setItems([]);
            revalidate();
        } catch (e) {
            setError(`Could not create product`);
        }
    };

    return {
        items,
        setItems,
        url,
        updateParams,
        error,
        handleSubmit,
    };
}
