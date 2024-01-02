import React from 'react';
import { MapPin, Phone, Tag } from 'react-feather';
import TagsSection from '@/components/TagsSection';
import Image from 'next/image';
import InfoItem from '@/components/InfoItem';
import { tagColors } from '@/lib/utils';

const Card = ({ children }:{
  children: React.ReactNode
}) => (
  <div className="bg-white shadow-md p-6 rounded-md">{children}</div>
);

const SupplierInformation = ({ shopName, country, city, address1, address2, tel1, tel2, imageUrl }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{shopName}</h2>
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="text-gray-600">
            <div className="flex items-center mb-2">
              <MapPin className="mr-2" size={16} color={tagColors.primary} />
              <span className="font-light">
                {`${country || 'Country'} / ${city || 'City'}`}
              </span>
            </div>
            <ul className="list-inside pl-4 font-light mb-2">
              <li>{address1 || 'Address'}</li>
              {address2 && <li>{address2}</li>}
            </ul>
            <div className="flex items-center mb-2">
              <Phone className="mr-2" size={16} color={tagColors.primary} />
              <ul className="list-inside ml-2 font-light">
                <li>{tel1 || 'N/A'}</li>
                {tel2 && <li>{tel2}</li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative w-20 h-20">
          <Image
            src={imageUrl}
            alt={shopName}
            className="rounded-md border border-gray-300 object-cover"
            layout="fill"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

const VerticalSupplierInformation = ({ shopName, country, city, address1, address2, tel1, tel2, tags }) => {
  return (
    <>
      <div className="text-xl font-bold mb-2">{shopName}</div>
      <div className="border-b border-gray-300 mb-4"></div>
      <div className="text-gray-600">
        <div className="flex items-center mb-2">
          <MapPin className="mr-2" size={16} color={tagColors.primary} />
          <span className="font-semibold">
            {`${country || 'Country'} / ${city || 'City'}`}
          </span>
        </div>
        <ul className="list-inside pl-4 font-light mb-4">
          <li>{address1 || 'N/A'}</li>
          {address2 && <li>{address2}</li>}
        </ul>
        <InfoItem
          label={
            <>
              <Phone className="mr-2" size={16} color={tagColors.primary} />
              <span>Telephone</span>
            </>
          }
        >
          <ul className="list-inside ml-2 font-light mb-2">
            <li>{tel1 || 'N/A'}</li>
            {tel2 && <li>{tel2}</li>}
          </ul>
        </InfoItem>
        <TagsSection tags={tags} />
      </div>
    </>
  );
};

export { SupplierInformation, VerticalSupplierInformation };
