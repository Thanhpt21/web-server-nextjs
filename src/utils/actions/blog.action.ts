// utils/actions/blog.action.ts
'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo bài viết mới
export const handleCreateBlogAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-blogs"); // Cập nhật cache cho danh sách bài viết
    return res;
};

// Cập nhật bài viết
export const handleUpdateBlogAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-blogs"); // Cập nhật cache cho danh sách bài viết
    return res;
};

// Xóa bài viết
export const handleDeleteBlogAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-blogs"); // Cập nhật cache cho danh sách bài viết
    return res;
};

// Lấy danh sách BlogCategories
export const fetchBlogCategories = async () => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-categories`, // Cập nhật URL cho BlogCategories
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        }
    });
    return res;
};

// Lấy danh sách bài viết
export const fetchBlogs = async (current: number, pageSize: number, category?: string) => {
    const session = await auth();
    const queryParams: { [key: string]: any } = { current, pageSize };
    if (category) queryParams.category = category;

    return sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`,
        method: 'GET',
        queryParams,
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-blogs'] }
        }
    });
};
