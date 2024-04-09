'use client'
import React, {useEffect, useState} from 'react';
import {useFetcher} from '@/app/hooks/useFetcher';
import DataLoading from "@/components/state/Loading";
import DataWrapper from "@/components/utils/wrappers/DataWrapper";
import {useDebounce} from "@/app/hooks/useDebounce";
import {updateUrl} from "@/lib/utils";

export default function TagResultBox({searchUrl, query, action}) {
    const [url, setUrl] = useState(searchUrl);
    const debouncedSearchTerm = useDebounce(query, 1000);
    const {data, error, isLoading} = useFetcher(url);
    useEffect(() => {
        setUrl((prevUrl: string) => {
            return updateUrl(prevUrl, {q: debouncedSearchTerm});
        });
    }, [debouncedSearchTerm]);
    return (
        <>
            {
                debouncedSearchTerm && (
                    <div>
                        <DataWrapper isLoading={isLoading} error={error} loadingComponent={<DataLoading/>}>
                            {
                                (data &&
                                    <ul>
                                        {
                                            data.map(item => <li onClick={() => action(item.name)}
                                                                 key={item.name}>{item.name}</li>)
                                        }
                                    </ul>) || 'Not found'
                            }
                        </DataWrapper>
                    </div>
                )
            }
        </>
    );
}