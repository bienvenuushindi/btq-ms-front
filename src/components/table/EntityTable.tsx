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
                         searchable = true,
                         metaLabels = {}
                     }: any) => {

    const updateParams = (newFilters) => {
        updateList((prevUrl) => {
            return updateUrl(prevUrl, newFilters);
        });
    };

    return (
        <>
            {(searchable || filters) && (
                <Card className="relative my-2 w-full min-w-0 justify-start rounded-2xl border border-slate-200/70 bg-white/95 p-2.5 sm:rounded-[24px] sm:p-4">
                    <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center">
                        {searchable ? <SearchBar onSearch={updateParams} containerClassName="w-full lg:flex-1"/> : <div className="hidden lg:block lg:flex-1" />}
                        <ShowRow updateCount={updateParams}/>
                        <div className="w-full lg:w-auto">
                            {filters}
                        </div>
                    </div>
                </Card>
            )}
            <Card className="relative w-full min-w-0 justify-start rounded-2xl border border-slate-200/70 bg-white/95 p-2.5 sm:rounded-[28px] sm:p-4">
                <div className="mb-2.5 flex w-full min-w-0 justify-start overflow-x-auto sm:mb-3 sm:justify-end">
                    {links && meta && <TableMetaData meta={meta} labels={metaLabels}/>}
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
                <div className="mt-3 flex w-full min-w-0 flex-col gap-2.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    {links && meta && (
                        <>
                            <TableMetaData meta={meta} labels={metaLabels}/>
                            <Paginate meta={meta} links={links} setUrl={updateList}/>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
};

export default EntityTable;
