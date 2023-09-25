'use client';
import clsx from 'clsx';
import {delay} from '@/lib/async';

export const BASE_URL = 'http://127.0.0.1:3001';
export const API_URL = BASE_URL + '/api/v1';

const fetcher = async ({url, method, body}) => {
  const res = await fetch(url, {
    method,
    ...(body && {body: JSON.stringify(body)}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }
  localStorage.setItem('token', res.headers.get('Authorization'));

  return await res.json();
};
export const signin = async (user) => {
  return fetcher({
    url: BASE_URL + '/login',
    method: 'POST',
    body: user,
  });
};

export const register = async (user) => {
  return fetcher({
    url: BASE_URL + '/signup',
    method: 'POST',
    body: user,
  });
};

export async function authFetcher(url) {
  await delay();
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: typeof window !== 'undefined' ? window.localStorage.getItem('token') : '',
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
      Authorization: typeof window !== 'undefined' ? window.localStorage.getItem('token') : '',
    },
  }).then(response => response.json()).then(result => {
    return result.data;
  });
}


export function deleteItem(path) {
  return fetch(API_URL + path, {
    method: 'DELETE',
    headers: {
      Authorization: typeof window !== 'undefined' ? window.localStorage.getItem('token') : '',
    },
  });
}