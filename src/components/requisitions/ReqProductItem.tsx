import Accordion from '@/components/Accordion';
import ReqProductItemInfo from '@/components/requisitions/ReqProductItemInfo';
import Button from '@/components/Button';
import React, {useContext} from 'react';
import Text from '@/components/Text';
import {XCircle, Trash} from 'react-feather';
import Image from 'next/image';
import clsx from 'clsx';
import {RequisitionContext} from "@/components/requisitions/RequisitionContext";

export default function ReqProductItem({row, removeItem, openAccordion, toggleAccordion}) {
  const isOpened = row.product_detail_id === openAccordion;
  return (
    <>
      <Accordion
        title={isOpened || <Title name={row.name} size={row.size} image_url={row.image_urls[0]}/>}
        content={<ReqProductItemInfo productDetails={row}/>}
        isOpen={isOpened}
        toggleAccordion={toggleAccordion}
        id={row.product_detail_id}
        className={clsx((isOpened || 'border-l-4'), (row.status || 'border-red-800'), (row.status && 'border-green-800'))}
      />
      <Button size="small" intent="danger" className="text-sm mx-1 mt-1" onClick={async () => {
        await removeItem(row.product_detail_id);
      }}><Trash size={17} color="#fff"/></Button>
    </>
  );
}

const Title = ({name, size, image_url}) => {
  return (
    <div className="flex gap-2">
      <Image
        src={image_url}
        alt={name}
        className="rounded-md border border-gray-100"
        width={60}
        height={60}
        priority
      />
      <div className="flex flex-col items-start">
        <Text size="medium" intent="secondary">{name}</Text>
        <Text size="small" intent="secondary">{size}</Text>
      </div>

    </div>
  );
};
