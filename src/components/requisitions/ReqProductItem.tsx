import Accordion from '@/components/Accordion';
import ReqProductItemInfo from '@/components/requisitions/ReqProductItemInfo';
import Button from '@/components/Button';
import React, {useState} from 'react';
import Text from '@/components/Text';
import {XCircle} from 'react-feather';
import Image from 'next/image';
import {getImageUrls} from '@/lib/utils';
import {BASE_URL} from '@/lib/api';

export default function ReqProductItem({row, requisitionId, removeItem, openAccordion, toggleAccordion}) {
  return (
    <>
      <Accordion
        title={row.product_detail_id === openAccordion || <Title name={row.name} size={row.size} image_url={row.image_urls[0]}/>}
        content={ <ReqProductItemInfo productDetails={row} requisitionId={requisitionId}/>}
        isOpen={row.product_detail_id === openAccordion}
        toggleAccordion={toggleAccordion}
        id={row.product_detail_id}
      />
      <Button size="small" intent="danger" className="text-sm mx-1 mt-1" onClick={async () => {
        await removeItem(row.product_detail_id);
      }}><XCircle size={17} color='#fff'/></Button>
    </>
  )
}

const Title = ({name, size, image_url}) => {
  return (
    <div className='flex gap-2'>
      <Image
        src={ BASE_URL + image_url}
        alt={name}
        className="rounded-md border border-gray-100"
        width={60}
        height={60}
        priority
      />
      <div className='flex flex-col items-start'>
        <Text size="medium" intent="secondary">{name}</Text>
        <Text size="small" intent="secondary">{size}</Text>
      </div>

    </div>
  );
};
