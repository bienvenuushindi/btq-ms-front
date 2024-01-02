'use client';
import {useContext, useState} from 'react';
import {useSuppliers} from '@/app/hooks/useSuppliers';
import {BASE_URL} from '@/lib/api';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import SuppliersHeader from '@/components/suppliers/SuppliersHeader';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';
import ErrorBoundary from '@/components/ErrorBoundary';
import EntityTable from '@/components/EntityTable';
import {Edit, Trash2} from 'react-feather';
import {useRouter} from 'next/navigation';

export default function Suppliers() {
  const [url, setUrl] = useState(null);
  const {openBar} = useContext(SidebarContext);
  const {suppliers, meta, links, error, isLoading} = useSuppliers(url);
  const router = useRouter();
  const columns = [
    {
      key: 'image_urls',
      type: 'picture',
      label: 'Supplier',
      dataTransformation: (value: any) => BASE_URL + value[0],
      // action: (data) => {
      //   setOpenBar({state: true, target: 'supplier_details'});
      //   setSidebarData(data.attributes);
      // }
    },
    {
      key: 'shop_name',
      type: 'text',
      label: 'Shop Name',
      // dataTransformation: (value: any) => value.toUpperCase(),
    },
  ];
  const callMe = (text) => {
    setUrl(text);
  };
  const content = {
    linkUrl: '/suppliers/create',
    linkText: 'New Supplier'
  };
  const actions = [
    {
      label: 'Edit',
      icon: (
        <Edit size={20}/>
      ),
      onClick: (rowIndex) => {
        router.push(`/suppliers/update/${rowIndex}`);
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
  return (
    <Container>
      <SuppliersHeader/>
      <ContainerOne>
        <ErrorBoundary error={error}>
          <EntityTable
            isLoading={isLoading}
            meta={meta}
            links={links}
            data={suppliers}
            updateList={setUrl}
            columns={columns}
            entities={'suppliers'}
            actions={actions}
          />
          <SidebarContentSelector target={openBar.target}/>
        </ErrorBoundary>
      </ContainerOne>
    </Container>);
}