'use server';

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo tàu mới
export const handleCreateShipAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ships`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-ships"); 
    return res;
};

// Cập nhật tàu
export const handleUpdateShipAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ships`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-ships"); 
    return res;
};

// Xóa tàu
export const handleDeleteShipAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ships/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-ships"); 
    return res;
};
