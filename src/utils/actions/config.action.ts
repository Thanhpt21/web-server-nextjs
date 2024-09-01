'use server';

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo cấu hình mới
export const handleCreateConfigAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/configs`, // Cập nhật URL cho configs
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-configs"); // Cập nhật cache cho danh sách cấu hình
    return res;
};

// Cập nhật cấu hình
export const handleUpdateConfigAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/configs`, // Cập nhật URL cho configs
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-configs"); // Cập nhật cache cho danh sách cấu hình
    return res;
};

// Xóa cấu hình
export const handleDeleteConfigAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/configs/${id}`, // Cập nhật URL cho configs
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-configs"); // Cập nhật cache cho danh sách cấu hình
    return res;
};
