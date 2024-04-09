'use client';
import {API_ENDPOINTS, API_URL} from '@/lib/api';
import Badge from '@/components/utils/Badge';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/table/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Edit, Trash2} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {updateUrl} from '@/lib/utils';
import {useFetcher} from "@/app/hooks/useFetcher";

export default function ProductsTable() {
  const [url, setUrl] = useState(API_ENDPOINTS.PRODUCTS);
  const {data: products = [], meta, links, error, isLoading} = useFetcher(url)
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const router = useRouter();
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      dataTransformation: (value: any) => value[0],
      action: (data) => {
        // setOpenBar({state: true, target: 'supplier_details'});
        // setSidebarData(data.attributes);
      }
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,

    }, {
      key: 'short_description',
      label: 'Description',
      type: 'description'
    }, {
      key: 'active',
      sortable: true,
      label: ' Status',
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> :
        <Badge variant="danger">Inactive</Badge>,
    }, {
      key: 'created_at',
      sortable: true,
      label: 'Created',
    }, {
      key: 'View',
      type: 'button',
      label: 'Details',
      action: async (data) => {
        await router.push('/products/' + data.id);
      }
    },
  ];

  const actions = [
    {
      label: 'Edit',
      className: 'text-lightBlue-100',
      icon: (
        <Edit size={20} color="#2962FF"/>
      ),
      onClick: (rowIndex) => {
        router.push(`/products/update/${rowIndex}`);
      },
    },
    {
      label: 'Delete',
      className: 'text-red-600',
      icon: (
        <Trash2 size={20} color="#EF4444FF"/>
      ),
      onClick: (rowIndex) => {
        console.log(`Delete clicked for row ${rowIndex}`);
      },
    },
  ];


  const Filters = () => {

    const statusFilter = {
      all: null,
      active: true,
      inactive: false
    }

    const field = {
      name: 'status',
      input_type: 'radio',
      className: '',
      value: selectedFilter,
      options: ['all', 'active', 'inactive'],
      action: (e) => {
        setSelectedFilter(e.target.value);
        handleFilterChange(statusFilter[e.target.value]);
      }
    }

    const handleFilterChange = (selectedFilters) => {
      setUrl((prevUrl) => {
        return updateUrl(prevUrl, {status: selectedFilters});
      });
    };

    return (
      <div className="flex space-x-2">
        <h2 className="font-bold text-gray-500">Status</h2>
        <FilterCheckbox field={field}/>
      </div>
    );
  }

  return (
    <ErrorBoundary error={error}>
      <EntityTable
        isLoading={isLoading}
        loader={<ProductsTableLoader/>}
        columns={columns}
        data={products}
        meta={meta}
        links={links}
        updateList={setUrl}
        actions={actions}
        filters={<Filters/>}
      />
    </ErrorBoundary>
  );
}

