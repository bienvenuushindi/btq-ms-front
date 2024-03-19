import ShowImages from '@/components/ShowImages';
import React from 'react';
import {VerticalSupplierInformation} from '@/components/suppliers/SupplierInformation';
import Card from '@/components/Card';
import {useFetcher} from "@/app/hooks/useFetcher";
import {API_ENDPOINTS} from "@/lib/api";

export default function SupplierDetails({supplierId}) {
    const {data: supplier = {}, included, isLoading, error} = useFetcher(API_ENDPOINTS.SUPPLIER_BY_ID(supplierId))
    const {
        shop_name,
        tags,
        address,
    } = supplier

    const {
        city,
        country,
        address1,
        address2,
        tel1,
        tel2,
    } = address
    return (
        <>
            <div>
                {isLoading ? <div>Loading....</div> :
                    <Card className="mx-2 space-y-3">
                        <ShowImages imagesUrls={supplier?.image_urls}/>
                        <Card>
                            <VerticalSupplierInformation
                                shopName={shop_name}
                                city={city}
                                country={country}
                                address1={address1}
                                address2={address2}
                                tel1={tel1}
                                tel2={tel2}
                                tags={tags}
                            />
                        </Card>

                    </Card>
                }
            </div>
        </>
    );
}
