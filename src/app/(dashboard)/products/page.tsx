'use client';
import {useProducts} from '@/app/hooks/useProducts';
import ButtonLink from '@/components/ButtonLink';
import {API_URL} from '@/lib/api';
import Button from '@/components/Button';
import {useState} from 'react';
import {SearchBar} from '@/components/SearchBar';
import ProductList from '@/components/products/ProductList';

export default function Products() {

  const [url, setUrl] = useState(null);
  const {data: products = [], meta, links, error, isLoading} = useProducts(url);
  const callMe = (text) => {
    setUrl(text)
  }
  const content = {
    linkUrl: '/products/create',
    linkText: 'New Product'
  };
  return <div>
    <ButtonLink
      href={content.linkUrl}
      size="small"
      intent="primary"
    >
      {content.linkText}
    </ButtonLink>
    <SearchBar updateList={callMe} submitTo={API_URL + '/products'}/>
    {
      isLoading && !error ? (<div>Loading...</div>) :
        error ? <div>Failed to load</div> :
          <>
            <ProductList products={products}/>
            {Object.keys(meta).map((key) => <span key={key}>{key}: {meta[key]}</span>)}
            {Object.keys(links).map((key) => key === 'self' ? null : meta['pages'] == 2 && (key == 'last' || key == 'first') ? null :
              <Button onClick={() => setUrl(links[key])} key={key}>{key}</Button>)}
          </>
    }

  </div>;
}