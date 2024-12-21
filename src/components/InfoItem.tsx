import Text from '@/components/Text';
import clsx from 'clsx';
import {MapPin} from 'react-feather';
import {tagColors} from '@/lib/helper';
import React from 'react';

export default function InfoItem({label, value, children, classValue, classLabel, row = false, icon = null}:any) {
  return (
    <div className={clsx('flex pb-3', row ? 'flex-row' : 'flex-col')}>
      <div className="flex gap-2 items-center w-fit text-gray-700 text-sm border-b">
        {label}
      </div>
      {
        value ? <Text size="large" intent="tertiary" className={classValue || ''}>{value}</Text> : children
      }
    </div>
  );
}