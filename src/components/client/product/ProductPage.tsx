// src/components/ProductPage.tsx
'use client'
import { setProductId } from '@/redux/features/productSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  data: any[],
  meta: {
      current: number,
      pageSize: number,
      pages: number,
      total: number
  },
}

const ProductPage = (props: IProps) => {
  const { data, meta } = props;
  const dispatch = useDispatch();

  const handleProductClick = (id: any) => {
    dispatch(setProductId(id));
  };

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/* Phần lọc */}
      <aside className="col-span-1 bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>
        <ul>
        <li>lọc</li>
        </ul>
      </aside>

      {/* Phần danh sách sản phẩm */}
      <main className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((d) => (
          <div key={d._id} className="bg-white border rounded-md shadow-md p-4">
            <img src={d.thumb} alt={d.name} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
            <p className="text-gray-700 mb-2">${d.price.toFixed(2)}</p>
          
            {/* <button onClick={() => handleProductClick(d._id)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"> */}
            <Link
              href={`/product/${d._id}`}  // Đường dẫn với id bao gồm trong URL
            >
              Xem
            </Link>
              {/* </button> */}
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProductPage;
