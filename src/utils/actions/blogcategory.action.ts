// utils/actions/blog-category.action.ts
'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo danh mục blog mới
export const handleCreateBlogCategoryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-categories`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-blog-categories"); // Cập nhật cache cho danh sách danh mục blog
    return res;
};

// Cập nhật danh mục blog
export const handleUpdateBlogCategoryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-categories`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-blog-categories"); // Cập nhật cache cho danh sách danh mục blog
    return res;
};

// Xóa danh mục blog
export const handleDeleteBlogCategoryAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-categories/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-blog-categories"); // Cập nhật cache cho danh sách danh mục blog
    return res;
};
