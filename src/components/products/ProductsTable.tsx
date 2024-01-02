'use client';
import {API_URL, BASE_URL} from '@/lib/api';
import Badge from '@/components/Badge';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {useProducts} from '@/app/hooks/useProducts';
import ProductsTableLoader from '@/components/banners/ProductsTableLoader';
import EntityTable from '@/components/EntityTable';
import ErrorBoundary from '@/components/ErrorBoundary';
import {Edit, Trash2} from 'react-feather';
import FilterCheckbox from '@/components/table/filter/FilterCheckbox';
import {updateUrl} from '@/lib/utils';

export default function ProductsTable() {
  const [url, setUrl] = useState(`${API_URL}/products`);
  const {data: products = [], meta, links, error, isLoading} = useProducts(url);
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const router = useRouter();
  console.log(url)
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: '',
      dataTransformation: (value: any) => BASE_URL + value[0],
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
    }, {
      key: 'active',
      sortable: true,
      label: ' Status',
      dataTransformation: (value: any) => value ? <Badge variant="success">Active</Badge> :
        <Badge variant="danger">Inactive</Badge>,
    }, {
      key: 'created_at',
      sortable: true,
      label: 'Created At',
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
      icon: (
        <Edit size={20}/>
      ),
      onClick: (rowIndex) => {
        router.push(`/products/update/${rowIndex}`);
      },
    },
    {
      label: 'Delete',
      icon: (
        <Trash2 size={20}/>
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
        console.log(e.target.value)
        setSelectedFilter(e.target.value);
        handleFilterChange(statusFilter[e.target.value]);
      }
    }

    const handleFilterChange = (selectedFilters) => {
      console.log('Selected Filters:', selectedFilters);
      setUrl((prevUrl) => {
        return updateUrl(prevUrl, {status: selectedFilters});
      });
    };

    return (
      <div className="flex space-x-2">
        <h2 className="font-bold">Status</h2>
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

