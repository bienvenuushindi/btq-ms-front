import { useState } from 'react';
import { API_URL, send } from '@/lib/api';
import { updateUrl } from '@/lib/utils';

export function useRequisitionForm({ requisitionID, revalidate, closeModal }) {
    const [items, setItems] = useState([]);
    const [url, setUrl] = useState(API_URL + '/products/search');
    const [error, setError] = useState('');

    const updateParams = (newFilters) => {
        setUrl((prevUrl) => updateUrl(prevUrl, newFilters));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        for (let i = 0; i < items.length; i++) {
            formData.append('requisition[product_detail_ids][]', items[i].id);
        }
        try {
            await send(`/requisitions/${requisitionID}/add_products`, formData);
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
