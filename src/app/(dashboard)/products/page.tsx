'use client';
import {useProducts} from '@/app/hooks/useProducts';
import ButtonLink from '@/components/ButtonLink';
import Image from 'next/image';
import {API_URL, BASE_URL} from '@/lib/api';
import Card from '@/components/Card';
import Button from '@/components/Button';
import {useEffect, useState} from 'react';
import {SearchBar} from '@/components/SearchBar';

export default function Products() {

  const [url, setUrl] = useState(null);
  const {data, meta, links, error, isLoading} = useProducts(url);
  const [products, setProducts] = useState([])
  useEffect(() => {
    setProducts(data)
  }, [data])
  const callMe = (text) => {
    setUrl(text)
  }
  const content = {
    linkUrl: '/products/create',
    linkText: 'New Product'
  };
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>
    <ButtonLink
      href={content.linkUrl}
      size="small"
      intent="primary"
    >
      {content.linkText}
    </ButtonLink>
    <SearchBar updateList={callMe} submitTo={API_URL + '/products'}/>
    <ul className="grid grid-cols-4 gap-1">
      {products && products.map(product =>
        <li key={product.id} className="w-full">
          <Card>
            <div className="">
              {product.attributes.name}, {product['attributes']['description']}
              {product['attributes']['image_urls'].map(image_url =>
                <Image
                  key={image_url}
                  src={BASE_URL + image_url}
                  alt="Product Image"
                  className=""
                  width={100}
                  height={100}
                  priority
                />
              )}
            </div>
          </Card>
        </li>)}
    </ul>
    {Object.keys(meta).map((key) => <span key={key}>{key}: {meta[key]}</span>)}
    {Object.keys(links).map((key) => key === 'self' ? null : meta['pages'] == 2 && (key == 'last' || key == 'first') ? null :
      <Button onClick={() => setUrl(links[key])} key={key}>{key}</Button>)}
  </div>;
}