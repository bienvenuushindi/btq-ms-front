import React from 'react';

const ProductItemLoader = () => {
  // Placeholder for 10 tag items
  const tags = Array.from({ length: 10 }, (_, index) => (
    <div
      key={`tag-${index}`}
      className="h-6 w-24 bg-gray-200 animate-pulse rounded-lg mb-2"
    ></div>
  ));
  return (
    <div className="flex items-start w-full">
      {/* Left side (Image) */}
      <div className="w-1/2 p-4">
        <div className="w-full h-96 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Right side (Details) */}
      <div className="w-1/2 p-4">
        <div className="mb-2">
          <div className="text-gray-600 animate-pulse">Name:</div>
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="mb-2">
          <div className="text-gray-600 animate-pulse">Short Description:</div>
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="mb-2">
          <div className="text-gray-600 animate-pulse">Description:</div>
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="mb-2">
          <div className="text-gray-600 animate-pulse">Created At:</div>
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div className="mb-2">
          <div className="text-gray-600 animate-pulse">Country of Origin:</div>
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        <div>
          <div className="text-gray-600 animate-pulse">Tags:</div>
          <div className='flex gap-2'>
            {tags}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductItemLoader;
