'use server'

import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

// Tạo yêu cầu mới
export const handleCreateEnquiryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiries`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-enquiries"); // Cập nhật cache cho danh sách yêu cầu
    return res;
};

// Cập nhật yêu cầu
export const handleUpdateEnquiryAction = async (data: any) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiries`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: { ...data }
    });
    revalidateTag("list-enquiries"); // Cập nhật cache cho danh sách yêu cầu
    return res;
};

// Xóa yêu cầu
export const handleDeleteEnquiryAction = async (id: string) => {
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiries/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });
    revalidateTag("list-enquiries"); // Cập nhật cache cho danh sách yêu cầu
    return res;
};

// Lấy danh sách yêu cầu với các tùy chọn lọc
export const fetchEnquiries = async (current: number, pageSize: number, status?: string) => {
    const session = await auth();
    const queryParams: { [key: string]: any } = { current, pageSize };
    if (status) queryParams.status = status;

    return sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiries`,
        method: 'GET',
        queryParams,
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-enquiries'] }
        }
    });
};
