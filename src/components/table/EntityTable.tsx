import React from 'react';
import TableMetaData from '@/components/table/TableMetaData';
import {SearchBar} from '@/components/SearchBar';
import DataGrid from '@/components/table/DataGrid';
import Paginate from '@/components/table/Paginate';
import DataGridWithActions from '@/components/table/DataGridWIthActions';
import Card from '@/components/utils/wrappers/Card';
import {ShowRow} from '@/components/table/filter/ShowRow';
import {updateUrl} from '@/lib/helper';

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
                     }: any) => {

    const updateParams = (newFilters) => {
        updateList((prevUrl) => {
            return updateUrl(prevUrl, newFilters);
        });
    };

    return (
        <>
            {searchable && (
                <Card className="w-full relative justify-start my-2 border border-slate-200/70 bg-white/95">
                    <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-center">
                        <SearchBar onSearch={updateParams} containerClassName="w-full lg:flex-1"/>
                        <ShowRow updateCount={updateParams}/>
                        <div className="w-full lg:w-auto">
                            {filters}
                        </div>
                    </div>
                </Card>
            )}
            <Card className="w-full relative justify-start border border-slate-200/70 bg-white/95">
                <div className="my-2 flex w-full justify-end overflow-x-auto">
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
                <div className="my-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {links && meta && (
                        <>
                            <TableMetaData meta={meta}/>
                            <Paginate meta={meta} links={links} setUrl={updateList}/>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
};

export default EntityTable;
