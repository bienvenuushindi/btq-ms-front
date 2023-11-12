import Card from '@/components/Card';
import Carousel from 'react-gallery-carousel';
import {BASE_URL} from '@/lib/api';
import InfoItem from '@/components/InfoItem';
import {countries} from '@/data/countries';
import Badge from '@/components/Badge';
import clsx from 'clsx';
import Text from '@/components/Text';

export default function ProductItem({product}){
  const image_urls = [...product.attributes.image_urls];
  const getImageUrls = () => {
    return (image_urls || []).map((image_path) => ({
      src: `${BASE_URL + image_path}`
    }));
  };

  return (
    <Card className="w-full">
      <div className="flex  justify-items-center gap-3">
        <div id="carousel" className="p-1 rounded shadow border-gray-100 border">
          <Carousel hasMediaButton={false}
                    images={getImageUrls()}
                    style={{
                      height: 400,
                      width: 400,
                    }}/>
        </div>
        <div className="flex flex-col items-start justify-start">
          <InfoItem label="Name" value={product.attributes.name}/>
          <InfoItem label="Short Description" value={product.attributes.short_description}/>
          <InfoItem label="Description" value={product.attributes.description}/>
          {/*<InfoItem label="Country Origin" value={product.attributes.country_origin}/>*/}
          <InfoItem label="Created At" value={product.attributes.created_at}/>
          <InfoItem label="Country of Origin" value={countries[product.attributes.country_origin]}/>
          <div className={'flex pb-3 flex-col'}>
            <Text size="small" intent="secondary" className="font-bold">Tags:</Text>
            <ul className="flex gap-1 ">
              {product.attributes.tags.map(item => <li key={item.name}><Badge variant="secondary" className="p-1 px-2"> {item.name} </Badge></li>)}
            </ul>
          </div>
        </div>
      </div>

    </Card>
  );
}