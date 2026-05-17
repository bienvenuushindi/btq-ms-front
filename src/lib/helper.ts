type DataPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
    [P in DataPropertyNames<T>]: T[P] extends object ? DTO<T[P]> : T[P]
};

export type DTO<T> = DataPropertiesOnly<T>;

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getImageUrls = (urls) => {
    return (urls || []).map((image_path) => image_path);
};

export const isPlaceholderImage = (photo: any) => (
    typeof photo === 'string' && (
        photo.includes('product-placeholder.png') ||
        photo.includes('supplier-placeholder.png') ||
        photo.includes('user-placeholder.svg') ||
        photo.includes('category-placeholder.svg') ||
        photo.includes('no-img.png')
    )
);

export const getEditableImageUrls = (urls) => {
    return getImageUrls(urls).filter((image_path) => !isPlaceholderImage(image_path));
};

// urlUtils.js
export const updateUrl = <T extends Record<string, string | undefined | null>>(
    prevUrl: string,
    newFilters: T
) => {
    const url = new URL(prevUrl);
    const params = new URLSearchParams(url.search);

    // Update or add each new filter to the URL
    Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
    });

    // Update the URL with the new parameters
    url.search = params.toString();
    return url.toString();
};


export function truncateDescription(description: string, maxLength = 200) {
    if (!description || description.length <= maxLength) {
        return description;
    }

    return description.substring(0, maxLength) + '......';
}

export function toggle(item: any, items: any[]) {
    if (items.includes(item)) items = items.filter(id => id !== item)
    else items = [...items, item]
    return {items}
}

export function toggleWithParent(item: any, items: any[], parent_id: any) {
    // If the parent id is not null then remove it as it is part of the list and the only child remaining is also going to be removed
    if (items.includes(item)) items = items.filter(id => id !== item);
    else items = [...items, item];
    if (parent_id !== null) items = items.filter(id => id !== parent_id);
    return { items };
}

// urlUtils.js
// export const updateUrl = (prevUrl, newFilters) => {
//   const url = new URL(prevUrl);
//
//   // Convert nested parameters to the encoded format
//   Object.entries(newFilters).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== '') {
//       url.searchParams.set(encodeURIComponent(key), encodeURIComponent(value));
//     } else {
//       url.searchParams.delete(encodeURIComponent(key));
//     }
//   });

//   return url.toString();
// };


export const tagColors = {
    primary: '#2563eb'
}

export const statusClasses = {
    active: "bg-teal-500",
    soon: "bg-amber-400",
    expired: "bg-rose-500",
    inactive: "bg-slate-400",
};

export const isPurchasedStatus = (status: unknown) => {
    if (typeof status === 'string') {
        return ['true', 'found', 'purchased', 'yes', '1'].includes(status.toLowerCase());
    }

    return Boolean(status);
};

export const isFoundStatus = isPurchasedStatus;

export const getRequisitionPurchasedItemsCount = (requisition: any) => {
    const items = requisition?.product_items;

    if (Array.isArray(items)) {
        return items.filter((item) => isPurchasedStatus(item?.status)).length;
    }

    return Number(requisition?.count_products_bought) || 0;
};

export const getRequisitionFoundItemsCount = getRequisitionPurchasedItemsCount;

export const getRequisitionItemsCount = (requisition: any) => {
    const items = requisition?.product_items;

    if (Array.isArray(items)) {
        return items.length;
    }

    return Number(requisition?.count_products) || 0;
};
