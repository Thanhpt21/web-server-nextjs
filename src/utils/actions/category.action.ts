// utils/actions.ts
'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo danh mục mới
export const handleCreateCategoryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-categories"); // Cập nhật cache cho danh sách danh mục
    return res;
};


// Cập nhật danh mục
export const handleUpdateCategoryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-categories"); // Cập nhật cache cho danh sách danh mục
    return res;
};


// Xóa danh mục
export const handleDeleteCategoryAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-categories"); // Cập nhật cache cho danh sách danh mục
    return res;
};
