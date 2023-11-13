import React from 'react';
import {API_URL} from '@/lib/api';
import TableMetaData from '@/components/TableMetaData';
import {SearchBar} from '@/components/SearchBar';
import DataGrid from '@/components/DataGrid';
import Paginate from '@/components/Paginate';
import DataGridWithActions from '@/components/DataGridWIthActions';
import Card from '@/components/Card';

const EntityTable = ({
                       entities,
                       updateList,
                       meta,
                       columns,
                       data,
                       isLoading,
                       loader,
                       links,
                       actions,
                       searchable = true
                     }) => {
  return (
   <>{searchable && <SearchBar updateList={updateList} submitTo={`${API_URL}/${entities}`}/>}
     <Card className="w-full relative justify-start my-2">
       <div className="flex justify-end w-full my-2">
         { links && meta && <TableMetaData meta={meta}/>}
       </div>
       {actions ?
         <DataGridWithActions
           columns={columns}
           data={data}
           tHeadProps={{color: 'primary'}}
           isLoading={isLoading}
           loader={loader}
           actions={actions}
         /> :
         <DataGrid
           columns={columns}
           data={data}
           tHeadProps={{color: 'primary'}}
           isLoading={isLoading}
           loader={loader}
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
