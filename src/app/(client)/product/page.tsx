import { auth } from '@/auth';
import Footer from '@/components/client/Footer'
import Header from '@/components/client/header/Header'
import ProductPage from '@/components/client/product/ProductPage';
import { sendRequest } from '@/utils/api';

import React from 'react'

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const Product = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const category = props?.searchParams?.category;
    const brand = props?.searchParams?.brand;

    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`, // Đổi thành products
        method: "GET",
        queryParams: {
            current,
            pageSize,
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-products'] } // Đổi tag thành list-products
        }
    });

  

  return (
    <>
        <ProductPage 
            data={res?.data?.data || []}
            meta={res?.data?.meta}
        />
    </>
  )
}

export default Product