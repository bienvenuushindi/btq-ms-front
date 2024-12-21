'use client';
import Cookies from 'js-cookie';
import {setToken} from "@/lib/auth";

//export const BASE_URL = 'https://btq-ms.onrender.com';
export const BASE_URL = 'http://127.0.0.1:3001'; //'http://192.168.25.49:3001'
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

    if (!res.ok) {
        throw new Error('API Error');
    }

    const jsonData = await res.json().then(result => result.data); // Parse JSON data

    const token = res.headers.get('Authorization'); // Get token from response headers
    setToken(JSON.stringify(jsonData), token); // Assuming setToken function accepts parsed JSON data and token separately
    return jsonData; // Return parsed JSON data
};
export const signin = async (user: { user: { email: string; password: string}; }) => {
    return fetcher({
        url: BASE_URL + '/login',
        method: 'POST',
        body: user,
    });
};


export const register = async (user: { user: { email: string; password: string; name: string; phone_number: string; role_id: number; }; }) => {
    return fetcher({
        url: BASE_URL + '/signup',
        method: 'POST',
        body: user,
    });
};

export async function authFetcher(url) {
    return fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: getTokenFromCookie(),
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()).then(result => {
        return result;
    });

}

export function send(path, body, method = 'POST') {
    return fetch(API_URL + path, {
        method: method,
        body: body,
        headers: {
            Authorization:getTokenFromCookie(),
        },
    }).then(response => response.json()).then(result => {
        return result.data;
    });
}


export function deleteItem(path) {
    return fetch(API_URL + path, {
        method: 'DELETE',
        headers: {
            Authorization: getTokenFromCookie(),
        },
    });
}

export const API_ENDPOINTS = {
    // Products
    SEARCH_PRODUCTS: `${API_URL}/products/search`,
    PRODUCT_STATS: `${API_URL}/products/stats`,
    PRODUCTS: `${API_URL}/products`,
    PRODUCT_BY_ID: (productId: any) => `${API_URL}/products/${productId}`,
    // Product Details (nested under Products)
    PRODUCT_DETAILS: (productId: any) => `${API_URL}/products/${productId}/product_details`,
    PRODUCT_DETAIL_BY_ID: (productId: any, productDetailId: any) =>
        `${API_URL}/products/${productId}/product_details/${productDetailId}`,
    PRODUCT_DETAIL_SUPPLIERS: (productDetailId: any) => `${API_URL}/product_details/${productDetailId}/suppliers`,
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
    CATEGORY_TREE_STRUCTURE: `${API_URL}/categories/tree_structure`,
    // Price Details (nested under Product Details)
    PRICE_DETAILS: (productDetailId: any) =>
        `${API_URL}/product_details/${productDetailId}/price_details`,
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
