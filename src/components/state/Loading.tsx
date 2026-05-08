import Text from '@/components/Text';
import React from 'react';
import Card from '@/components/utils/wrappers/Card';
import Image from 'next/image';
import {BRAND_LOGO, BRAND_NAME} from '@/lib/brand';

export default function DataLoading(){
  return(
    <Card className="flex h-32 w-full items-center justify-center gap-4 rounded-[28px] border border-slate-200/90 bg-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary text-white shadow-[0_12px_24px_rgba(255,122,53,0.25)]">
        <Image src={BRAND_LOGO} alt={BRAND_NAME} width={56} height={56} className="h-14 w-14 rounded-[20px] object-cover" />
      </div>
      <div className="flex flex-col">
        <Text size="large" intent="tertiary" className="font-display font-bold text-slate-900">{BRAND_NAME}</Text>
        <Text size="medium" intent="secondary" className="font-semibold text-slate-500">Loading content...</Text>
      </div>
    </Card>
  )
}
