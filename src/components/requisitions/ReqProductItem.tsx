import Button from '@/components/utils/Button';
import React, {useContext} from 'react';
import Text from '@/components/Text';
import {CheckCircle, Circle, Eye, MinusCircle} from 'react-feather';
import Image from 'next/image';
import clsx from 'clsx';
import Badge from '@/components/utils/Badge';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {RequisitionContext} from '@/components/requisitions/RequisitionContext';
import {isPurchasedStatus} from '@/lib/helper';

const formatCurrencyValue = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return value;

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export default function ReqProductItem({row, removeItem}) {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const {requisition} = useContext(RequisitionContext);
  const isArchived = Boolean(requisition?.archived);
  const purchased = isPurchasedStatus(row.status);

  const openDrawer = () => {
    setSidebarData(row);
    setOpenBar({
      state: true,
      target: 'requisition_item',
      title: `${row.name} (${row.size})`,
      panelClassName: 'w-full',
    });
  };

  return (
    <div className="flex w-full items-start gap-2">
      <button
        type="button"
        onClick={openDrawer}
        className={clsx(
          'flex-1 rounded-[18px] border-l-4 bg-white px-4 py-3 text-left transition hover:bg-slate-50',
          purchased ? 'border-emerald-600' : 'border-rose-600'
        )}
      >
        <Title row={row} isArchived={isArchived} purchased={purchased}/>
      </button>
      {!isArchived ? (
        <Button size="small" intent="none" className="mx-1 mt-1 rounded-full border border-amber-200 bg-amber-50 text-sm hover:bg-amber-100" onClick={async () => {
          await removeItem(row.product_detail_id);
        }}>
          <MinusCircle size={17} color="#b45309"/>
        </Button>
      ) : null}
    </div>
  );
}

const Title = ({row, isArchived, purchased}) => {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Image
        src={row.image_urls[0]}
        alt={row.name}
        className="rounded-xl border border-slate-200 bg-slate-50 object-cover"
        width={56}
        height={56}
        priority
      />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <div className="flex w-full min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Text size="medium" intent="tertiary" className="block truncate font-bold">{row.name}</Text>
            <Text size="small" intent="secondary" className="block">{row.size}</Text>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={purchased ? 'success' : 'danger'} size="small">
              {purchased ? 'Purchased' : 'Pending purchase'}
            </Badge>
            {row.quantity ? (
              <Badge variant="secondary" size="small">
                {row.quantity} {row.quantity_type || 'units'}
              </Badge>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">
              <Eye size={12}/>
              {isArchived ? 'View details' : 'Open details'}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            {purchased ? <CheckCircle size={14} className="text-emerald-600"/> : <Circle size={14} className="text-rose-600"/>}
            {row.supplier_name ? `Vendor: ${row.supplier_name}` : row.supplier_id ? 'Vendor selected' : 'Vendor not selected'}
          </span>
          <span>Total: {row.price && row.quantity ? `${formatCurrencyValue(row.price * row.quantity)} ${row.currency || ''}` : 'Not set'}</span>
          <span>{isArchived ? 'View only' : 'Open drawer to edit'}</span>
        </div>
      </div>
    </div>
  );
};
