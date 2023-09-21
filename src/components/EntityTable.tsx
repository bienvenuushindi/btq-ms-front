import React from 'react';
import {API_URL} from '@/lib/api';
import TableMetaData from '@/components/TableMetaData';
import {SearchBar} from '@/components/SearchBar';
import DataGrid from '@/components/DataGrid';
import Paginate from '@/components/Paginate';

const EntityTable = ({ entities, updateList, meta, columns, data, isLoading, loader, links }) => {
  return (
    <>
      <SearchBar updateList={updateList} submitTo={`${API_URL}/${entities}`}/>
      <TableMetaData meta={meta} />
      <DataGrid
        columns={columns}
        data={data}
        tHeadProps={{ color: 'primary' }}
        isLoading={isLoading}
        loader={loader}
      />
      <div className='flex justify-between w-full my-2'>
        <TableMetaData meta={meta} />
        <Paginate meta={meta} links={links} setUrl={updateList} />
      </div>
    </>
  );
};

export default EntityTable;
