'use client'
import {useContext, useState} from 'react';
import dynamic from 'next/dynamic';
import {SidebarContext} from '@/components/sections/sidebar/SidebarContainer';
import {Edit, Trash2} from 'react-feather';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import EntityTable from '@/components/table/EntityTable';
import DateDisplay from "@/components/DateDisplay";
import {getImageUrls} from '@/lib/helper';
import Badge from '@/components/utils/Badge';

const ProductVariantCreateModal = dynamic(() => import('@/components/products/ProductVariantCreateModal'), {
  ssr: false,
});

const approvalBadgeVariant = (status) => {
  if (status === 'approved') return 'success';
  if (status === 'rejected') return 'danger';
  return 'warning';
};

export const ProductDetailsTable = ({product, isLoading}) => {
  const {setOpenBar, setSidebarData} = useContext(SidebarContext);
  const params = useParams();
  const productID = params.id;
  const [editingVariant, setEditingVariant] = useState(null);
  const closeEditModal = () => setEditingVariant(null);

  const actions = [
    {
      label: 'Edit',
      className: 'text-lightBlue-100',
      icon: (
        <Edit size={15} color="#2962FF"/>
      ),
      onClick: (row) => {
        setEditingVariant(row);
      },
    },
    {
      label: 'Delete',
      className: 'text-red-600',
      icon: (
        <Trash2 size={15} color="#EF4444FF"/>
      ),
      onClick: (row) => {
        console.log(`Delete clicked for row ${row.id}`);
      },
    },
  ];
  const columns = [
    {
      key: 'size',
      type: 'text',
      label: 'Variants',
      dataTransformation: (value: any, row: any) => {
        const imageSrc = getImageUrls(row.image_urls || [])[0] || '/images/product-placeholder.png';

        return (
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={imageSrc}
              alt={`${product.name} ${value}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white object-cover"
              priority
            />
            <span className="min-w-0 font-semibold text-slate-900">
              {product.name}<br/>{value.toUpperCase()}
            </span>
          </div>
        );
      },
    },
    {
      key: 'box_units',
      type: 'text',
      label: 'Box Units',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
    {
      key: 'dozen_units',
      type: 'text',
      label: 'Group Units',
    },
    {
      key: 'expired_date',
      type: 'text',
      label: 'Expired',
      dataTransformation: (value: any) => <DateDisplay date={value} />
    },
    {
      key: 'approval_status',
      type: 'text',
      label: 'Approval',
      dataTransformation: (value: any, row: any) => {
        const status = value || (row.status ? 'approved' : 'pending_review');
        return (
          <Badge variant={approvalBadgeVariant(status)} size="small" className="capitalize">
            {status.replace('_', ' ')}
          </Badge>
        );
      },
    },
    {
      key: 'button',
      type: 'details',
      label: (row) => `Suppliers (${row.suppliers?.length || 0})`,
      action: (data) => {
        setOpenBar({state: true, target: 'price_details',title:  product.name + ' (' + data.size+ ')'});
        setSidebarData(data);
      }
    },
  ];

  return (
    <>
      <EntityTable
        isLoading={isLoading}
        columns={columns}
        data={product.product_details}
        actions={actions}
        searchable={false}
      />
      <ProductVariantCreateModal
        isOpen={Boolean(editingVariant)}
        onClose={closeEditModal}
        productId={productID}
        variant={editingVariant}
      />
    </>
  );
};
