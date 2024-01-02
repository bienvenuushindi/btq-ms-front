import ShowImages from '@/components/ShowImages';
import useSupplier from '@/app/hooks/useSupplier';
import React from 'react';
import {VerticalSupplierInformation} from '@/components/suppliers/SupplierInformation';
import Card from '@/components/Card';

export default function SupplierDetails({supplierId}) {
  const {data: result = {}, included, isLoading, error} = useSupplier(supplierId);
  const {attributes: supplier={}} = result;
  const {
    shop_name,
    city,
    country,
    address1,
    address2,
    tel1,
    tel2,
    tags,
  } = supplier;
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
