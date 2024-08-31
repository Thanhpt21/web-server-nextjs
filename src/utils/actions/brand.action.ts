// utils/actions.ts
'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo thương hiệu mới
export const handleCreateBrandAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-brands"); // Cập nhật cache cho danh sách thương hiệu
    return res;
};

// Cập nhật thương hiệu
export const handleUpdateBrandAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-brands"); // Cập nhật cache cho danh sách thương hiệu
    return res;
};

// Xóa thương hiệu
export const handleDeleteBrandAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-brands"); // Cập nhật cache cho danh sách thương hiệu
    return res;
};

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

export const fetchBrands = async (current: number, pageSize: number, category?: string) => {
    const session = await auth();
    const queryParams: { [key: string]: any } = { current, pageSize };
    if (category) queryParams.category = category;

    return sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`,
        method: 'GET',
        queryParams,
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-brands'] }
        }
    });
};
