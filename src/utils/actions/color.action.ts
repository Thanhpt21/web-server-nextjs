'use server';

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo màu mới
export const handleCreateColorAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-colors"); // Cập nhật cache cho danh sách màu
    return res;
};

// Cập nhật màu
export const handleUpdateColorAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-colors"); // Cập nhật cache cho danh sách màu
    return res;
};

// Xóa màu
export const handleDeleteColorAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-colors"); // Cập nhật cache cho danh sách màu
    return res;
};
