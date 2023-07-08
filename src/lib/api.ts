'use client';
import clsx from 'clsx';

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
    console.log('Error thrown .....................');
    throw new Error('API Error');
  }
  console.log('ok');
  console.log(res.headers);
  localStorage.setItem('token', res.headers.get('Authorization'));

  const data = await res.json();
  console.log('data found .....................' + data);
  return data;
  // }
};

const autFetcher = async ({url, method, body = null}) => {
  // console.log(clsx(url, 'is the api url'));

  const {data} = await fetch(url, {
    method,
    ...(body && {body: JSON.stringify(body)}),
    headers: {
      Accept: 'application/json',
      Authorization: typeof window !== 'undefined' ? window.localStorage.getItem('token') : '',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()).then(data => {
    return data;
  }).catch(e => console.log(e));

  // if (!res.ok) {
  //   console.log('Error thrown .....................');
  console.log(data)
  //   throw new Error('API Error');
  // }
  ;
  console.log('data found .....................' + data);
  return data;
};
export const register = async (user) => {
  return fetcher({
    url: clsx(BASE_URL, '/signup'),
    method: 'POST',
    body: user,
  });
};

export const signin = async (user) => {
  return fetcher({
    url: BASE_URL + '/login',
    method: 'POST',
    body: user,
  });
};

export function authFetcher(url) {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: typeof window !== 'undefined' ? window.localStorage.getItem('token') : '',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json()).then(result => result.data);
}

// export const getUsers = async () => {
//   console.log('loading users .........');
//   return authFetcher({
//       url: API_URL + '/users',
//       method: 'GET',
//     }
//   );
// };