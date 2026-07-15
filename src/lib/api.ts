'use client';
import Cookies from 'js-cookie';
import {setToken} from "@/lib/auth";

// export const BASE_URL = 'https://btq-ms.onrender.com';
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001';
export const API_URL = BASE_URL + '/api/v1';

// Function to retrieve the authentication token from cookies
export function getTokenFromCookie() {
    return Cookies.get('accessToken');
}
const fetcher = async ({url, method, body}) => {
    const res = await fetch(url, {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message =
            result?.error ||
            result?.message ||
            result?.errors?.join?.(', ') ||
            'API Error';
        throw new Error(message);
    }

    const jsonData = result.data;

    const token = res.headers.get('Authorization'); // Get token from response headers
    if (token) {
        setToken(JSON.stringify(jsonData), token);
    }
    return jsonData; // Return parsed JSON data
};
export const signin = async (user: { user: { email: string; password: string}; }) => {
    return fetcher({
        url: BASE_URL + '/login',
        method: 'POST',
        body: user,
    });
};


export const register = async (user: { user: { email: string; password: string; name?: string; phone_number?: string; role_id?: number; }; }) => {
    return fetcher({
        url: BASE_URL + '/signup',
        method: 'POST',
        body: user,
    });
};

export async function authFetcher(url) {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: getTokenFromCookie(),
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Request failed');
    }

    return result;

}

export function send(path, body, method = 'POST') {
    return fetch(API_URL + path, {
        method: method,
        body: body,
        headers: {
            Authorization:getTokenFromCookie(),
        },
    }).then(async (response) => {
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            const message =
                result?.error ||
                result?.message ||
                result?.meta?.message ||
                result?.status?.message ||
                result?.errors?.join?.(', ') ||
                'Request failed';
            throw new Error(message);
        }

        return result.data;
    });
}


export function deleteItem(path) {
    return fetch(API_URL + path, {
        method: 'DELETE',
        headers: {
            Authorization: getTokenFromCookie(),
        },
    }).then(async (response) => {
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            const message =
                result?.error ||
                result?.message ||
                result?.errors?.join?.(', ') ||
                'Request failed';
            throw new Error(message);
        }

        return result.data;
    });
}

export const API_ENDPOINTS = {
    // Products
    SEARCH_PRODUCTS: `${API_URL}/products/search`,
    PRODUCT_STATS: `${API_URL}/products/stats`,
    PRODUCTS: `${API_URL}/products`,
    PRODUCT_MARKET: `${API_URL}/products/market`,
    SEARCH_PRODUCT_MARKET: `${API_URL}/products/market/search`,
    PRODUCT_BY_ID: (productId: any) => `${API_URL}/products/${productId}`,
    // Product Details (nested under Products)
    PRODUCT_DETAILS: (productId: any) => `${API_URL}/products/${productId}/product_details`,
    PRODUCT_DETAIL_BY_ID: (productId: any, productDetailId: any) =>
        `${API_URL}/products/${productId}/product_details/${productDetailId}`,
    PRODUCT_DETAIL_SUPPLIERS: (productDetailId: any) => `${API_URL}/product_details/${productDetailId}/suppliers`,
    PRODUCT_SHELF_LIFE_STATS: `${API_URL}/product_details/shelf_life_stats`,
    // Suppliers
    SUPPLIERS: `${API_URL}/suppliers`,
    SUPPLIER_BY_ID: (supplierId: any) => `${API_URL}/suppliers/${supplierId}`,
    SEARCH_SUPPLIERS: (productDetailId: any= '') => productDetailId ? `${API_URL}/suppliers/search/filter/${productDetailId}` : `${API_URL}/suppliers/search/filter`,
    // Tags
    SEARCH_TAGS: `${API_URL}/tags/search`,
    // Roles
    ROLES: `${API_URL}/roles`,
    // Categories
    CATEGORIES: `${API_URL}/categories`,
    CATEGORY_BY_ID: (categoryId: any) => `${API_URL}/categories/${categoryId}`,
    CATEGORY_TREE_STRUCTURE: `${API_URL}/categories/tree_structure`,
    // Price Details (nested under Product Details)
    PRICE_DETAILS: (productDetailId: any) =>
        `${API_URL}/product_details/${productDetailId}/price_details`,
    SUPPLIER_PRODUCT_DETAILS_BULK: `${API_URL}/supplier_product_details/bulk`,
    REMOVE_PRICE_DETAIL_SUPPLIER: (productDetailId: any, supplierId: any) =>
        `${API_URL}/product_details/${productDetailId}/price_details/supplier/${supplierId}`,
    // Requisitions
    REQUISITIONS: `${API_URL}/requisitions`,
    REQUISITION_BY_ID: (requisitionId: any) => `${API_URL}/requisitions/${requisitionId}`,
    RECENT_REQUISITIONS: `${API_URL}/requisitions/recent`,
    FIND_REQUISITION_BY_DATE: (date: any) => `${API_URL}/requisitions/date/${date}`,
    REMOVE_REQUISITION_ITEM: (requisitionId: any, productDetailId: any) =>
        `${API_URL}/requisitions/${requisitionId}/product_details/${productDetailId}/remove_item`,
    ADD_REQUISITION_PRODUCTS: (requisitionId: any) => `${API_URL}/requisitions/${requisitionId}/add_products`,
    UPDATE_REQUISITION_PRODUCTS_LIST: (requisitionId: any, productDetailId: any) =>
        `${API_URL}/requisitions/${requisitionId}/update_products/${productDetailId}`,
    // Addresses
    ADDRESSES: `${API_URL}/addresses`,
    // Users
    USERS: `${API_URL}/users`,
    // Requisition Products
    REQUISITION_PRODUCTS: `${API_URL}/requisition_products`,
    // Current User
    CURRENT_USER: `${API_URL}/current_user`,
    // Quantity Types
    QUANTITY_TYPES: `${API_URL}/quantity_types`,
    // Currencies
    CURRENCIES: `${API_URL}/currencies`,
    // Authentication
    CHECK_AUTH: `${API_URL}/check_auth`,
};
