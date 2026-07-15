import Text from '@/components/Text';
import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import Image from 'next/image';
import {BRAND_LOGO, BRAND_NAME} from '@/lib/brand';

export default function DataLoading(){
  return(
    <Card className="flex h-24 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white sm:h-32 sm:gap-4 sm:rounded-[28px]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_24px_rgba(255,122,53,0.25)] sm:h-14 sm:w-14 sm:rounded-[20px]">
        <Image src={BRAND_LOGO} alt={BRAND_NAME} width={56} height={56} className="h-11 w-11 rounded-2xl object-cover sm:h-14 sm:w-14 sm:rounded-[20px]" />
      </div>
      <div className="flex flex-col">
        <Text size="large" intent="tertiary" className="font-display font-bold text-slate-900">{BRAND_NAME}</Text>
        <Text size="medium" intent="secondary" className="font-semibold text-slate-500">Loading content...</Text>
      </div>
    </Card>
  )
}
