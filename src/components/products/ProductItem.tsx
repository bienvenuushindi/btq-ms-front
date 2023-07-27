import Image from 'next/image';
import {BASE_URL} from '@/lib/api';
import Card from '@/components/Card';

export default function ProductItem({product}){
  return(
    <Card>
      <div className="">
        Name: {product.attributes.name},
        {product['attributes']['image_urls'].map(image_url =>
          <Image
            key={image_url}
            src={BASE_URL + image_url}
            alt="Product Image"
            className=""
            width={100}
            height={100}
            priority
          />
        )}

        Description: {product.attributes.short_description}
      </div>
    </Card>
  )
}