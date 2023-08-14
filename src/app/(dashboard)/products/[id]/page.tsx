'use client';
import {useParams} from 'next/navigation';
import {useProduct} from '@/app/hooks/useProduct';
import ProductItem from '@/components/products/ProductItem';
import ButtonLink from '@/components/ButtonLink';
import Card from '@/components/Card';
import {ProductDetailsTable} from '@/components/products/ProductDetailsTable';
import {SidebarContainer, SidebarContext} from '@/components/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import {useContext} from 'react';


export default function Product() {
  const {openBar} = useContext(SidebarContext)
  const params = useParams();
  const productId = params.id;
  const {data: product, included: details, error, isLoading} = useProduct(productId);
  const content = {
    linkUrl: '/products/' + productId + '/details/create',
    linkText: 'Add Details'
  };
  return <div className="relative h-full flex-col">
    <ButtonLink
      href={content.linkUrl}
      size="small"
      intent="primary"
    >
      {content.linkText}
    </ButtonLink>
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Failed to load</div>}
      {product && (
        <ul>
          <li key={product.id}>
            <ProductItem product={product}/>
          </li>
        </ul>
      )}

    </div>
    <div className="grow flex-1">
      <Card>
        <ProductDetailsTable details={details}/>
      </Card>
    </div>


    <SidebarContainer>
      <SidebarContentSelector target={openBar.target}/>
    </SidebarContainer>
  </div>;
}