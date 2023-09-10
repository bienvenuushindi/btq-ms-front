'use client';
import ButtonLink from '@/components/ButtonLink';
import {useContext, useState} from 'react';
import {useSuppliers} from '@/app/hooks/useSuppliers';
import {API_URL} from '@/lib/api';
import {SearchBar} from '@/components/SearchBar';
import Card from '@/components/Card';
import {SidebarContext} from '@/components/sidebar/SidebarContainer';
import SidebarContentSelector from '@/components/SidebarContentSelector';
import SuppliersTable from '@/components/suppliers/SuppliersTable';
import SuppliersHeader from '@/components/suppliers/SuppliersHeader';
import ContainerOne from '@/components/ContainerOne';
import Container from '@/components/Container';

export default function Suppliers() {
  const {openBar} = useContext(SidebarContext);
  const [url, setUrl] = useState(null);
  const {suppliers, meta, links, error, isLoading} = useSuppliers(url);
  console.log(suppliers);
  const callMe = (text) => {
    setUrl(text);
  };
  const content = {
    linkUrl: '/suppliers/create',
    linkText: 'New Supplier'
  };
  return <Container>

    <SuppliersHeader/>
    <ContainerOne>
      <SearchBar updateList={callMe} submitTo={API_URL + '/suppliers'}/>

      {
        isLoading && !error ? (<div>Loading...</div>) :
          error ? <div>Failed to load</div> :
            <>
              <div className="grow flex-1 w-full">
                <Card className="">
                  {<SuppliersTable suppliers={suppliers}/>}
                </Card>
              </div>
              <SidebarContentSelector target={openBar.target}/>
            </>
      }
    </ContainerOne>
  </Container>;
}