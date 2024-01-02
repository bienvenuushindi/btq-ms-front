import React from 'react';
import EntityHeader from '@/components/EntityHeader';
import {useParams} from 'next/navigation';
import {PlusCircle} from 'react-feather';
import ButtonLink from '@/components/ButtonLink';
import SelectProductVariant from '@/components/pages/products/details/SelectProductVariant';


const ProductDetailsHeader = ({details}) => {
  const params = useParams();
  const productId = params.id;
  const actions = [];
  return (
    <EntityHeader title="Product Details" actions={actions}>
      <div className={"flex gap-2"}>
        <ButtonLink
          href={ '/products/' + productId + '/details/create'}
          size="small"
          intent={'primary'}
          className="px-1 py-2 rounded-md flex items-center gap-1 text-sm"
        >
          <PlusCircle color="#FFFFFF" size={20}/>
          <span className="text-neutral-50 ">Add Variant </span>
        </ButtonLink>
        <SelectProductVariant details={details}/>
      </div>
    </EntityHeader>
  );
};

export default ProductDetailsHeader;