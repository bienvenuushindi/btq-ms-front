'use client'
import ExpiredProductContainer from '@/components/requisitions/ExpiredProductContainer';
import React from 'react';
import {useSearchParams} from 'next/navigation';

export default function Products() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const title = status == 'expired' ? 'Expired' : 'Expired Soon'

  return (
    <div className="container mx-auto">
      <ExpiredProductContainer title={title} type={status}/>
    </div>
  );
}