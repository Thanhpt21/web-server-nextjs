'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";



// Tạo sản phẩm mới
export const handleCreateProductAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-products"); // Cập nhật cache cho danh sách sản phẩm
    return res;
};

// Cập nhật sản phẩm
export const handleUpdateProductAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-products"); // Cập nhật cache cho danh sách sản phẩm
    return res;
};

// Xóa sản phẩm
export const handleDeleteProductAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-products"); // Cập nhật cache cho danh sách sản phẩm
    return res;
};

// Thay đổi fetchBrands để nhận categoryId
export const fetchBrandByCategory = async (categoryId: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/category/${categoryId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};

// Lấy danh mục
export const fetchCategories = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};

// Lấy danh sách màu sắc
export const fetchColors = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors`, // Đảm bảo endpoint này tồn tại trên backend
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};

// Lấy danh sách biến thể theo ID sản phẩm
export const getVariantByProduct = async (productId: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/variants/${productId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};
