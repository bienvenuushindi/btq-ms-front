import React, {useState} from 'react';
import {API_URL} from '@/lib/api';
import TableMetaData from '@/components/TableMetaData';
import {SearchBar} from '@/components/SearchBar';
import DataGrid from '@/components/DataGrid';
import Paginate from '@/components/Paginate';
import DataGridWithActions from '@/components/DataGridWIthActions';
import Card from '@/components/Card';
import {ShowRow} from '@/components/table/filter/ShowRow';
import {updateUrl} from '@/lib/utils';

const EntityTable = ({
                       updateList,
                       meta,
                       columns,
                       data,
                       isLoading,
                       loader,
                       links,
                       actions,
                       filters,
                       searchable = true
                     }) => {

  const updateParams = (newFilters) => {
    updateList((prevUrl) => {
      return updateUrl(prevUrl, newFilters);
    });
  };

  return (
    <>{searchable && (
      <div className="flex gap-2 items-center">
        <SearchBar onSearch={updateParams}/>
        <ShowRow updateCount={updateParams}/>
        <div>
          {filters}
        </div>
      </div>

    )}
      <Card className="w-full relative justify-start my-2">
        <div className="flex justify-end w-full my-2">
          {links && meta && <TableMetaData meta={meta}/>}
        </div>
        {actions ?
          <DataGridWithActions
            columns={columns}
            data={data}
            tHeadProps={{color: 'primary'}}
            isLoading={isLoading}
            loader={loader}
            actions={actions}
            onSorting={updateParams}
          /> :
          <DataGrid
            columns={columns}
            data={data}
            tHeadProps={{color: 'primary'}}
            isLoading={isLoading}
            loader={loader}
            onSorting={updateParams}
          />}
        <div className="flex justify-between w-full my-2">
          {links && meta && (
            <>
              <TableMetaData meta={meta}/>
              <Paginate meta={meta} links={links} setUrl={updateList}/>
            </>
          )}
        </div>
      </Card></>

  );
};

export default EntityTable;
