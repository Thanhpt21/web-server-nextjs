'use client'
import React from 'react'


interface IProps {
  data: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    code: string;
    brand: string;
    thumb: string;
    images: string[];
    price: number;
    discount: number;
    category: string;
    status: number;
    sold: number;
    colors: string[];
    ratings: any[];
    totalratings: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  };
}

const ProductDetailPage = ({data}: IProps) => {
  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log('Add to cart:', data._id);
  };

  const handleBuyNow = () => {
    // Logic to proceed to checkout or purchase immediately
    console.log('Buy now:', data._id);
  };

  return (
    <div className="p-4">
    <header className="mb-4">
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="text-gray-500">{data?.code}</p>
    </header>

      <div className="w-full md:w-1/2 md:pl-4">
      <div className="w-full md:w-1/2">
          <img src={data.thumb} alt={data.title} className="w-full h-auto mb-4 rounded-md" />
          <div className="flex gap-4">
            {data.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <p className="text-lg font-semibold mb-2">Price: ${data?.price}</p>
        <p className="text-lg font-semibold mb-2">Discount: {data?.discount}</p>
        <p className="text-gray-500">Category: {data?.category}</p>
        <p className="text-gray-500">Brand: {data?.brand}</p>
        <p className="text-gray-500">Sold: {data?.sold}</p>
        <p className="text-gray-500">Ratings: {data?.totalratings}</p>
       
      </div>
      <div className="mt-4 flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Thêm vào giỏ hàng
          </button>
          <button 
            onClick={handleBuyNow}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Mua ngay
          </button>
        </div>

    </div>
  )
}

export default ProductDetailPage