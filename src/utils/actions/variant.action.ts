'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo biến thể mới
export const handleCreateVariantAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/variants`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-variants"); // Cập nhật cache cho danh sách biến thể
    return res;
};

// Cập nhật biến thể
export const handleUpdateVariantAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/variants`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-variants"); // Cập nhật cache cho danh sách biến thể
    return res;
};

// Xóa biến thể
export const handleDeleteVariantAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/variants/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-variants"); // Cập nhật cache cho danh sách biến thể
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

export const fetchProductById = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/${id}`, // Đảm bảo endpoint này tồn tại trên backend
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};
