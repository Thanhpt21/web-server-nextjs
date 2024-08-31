'use server'

import {auth, signIn} from "@/auth";
import { sendRequest } from "../api";
import { revalidateTag } from "next/cache";



export async function authenticate(username: string, password: string) {
    try {
        const r = await signIn("credentials", {
            username: username,
            password: password,
            // callbackUrl: "/",
            redirect: false,
        })
        return r
    } catch (error) {
        if((error as any).name === "InvalidEmailPasswordError"){
            return {
                error: (error as any).type,
                code: 1
            }
        }else if((error as any).name === "InActiveAccountError"){
            return {
                error: (error as any).type,
                code: 2
            }
        }else{
            return {
                error: "Internal sever error",
                code: 0
            }
        }
       
    }
}




export const handleCreateUserAction = async (data: any) => {
    const session = await auth()
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: {...data}
    })
    revalidateTag("list-users")
    return res
}

export const handleUpdateUserAction = async (data: any) => {
    const session = await auth()
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        body: {...data}
    })
    revalidateTag("list-users")
    return res
}

export const handleDeleteUserAction = async (id: string) => {
    const session = await auth();

    // Gửi yêu cầu DELETE đến API backend
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`, // Thay đổi đường dẫn nếu cần
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
    });

    // Bạn có thể thêm logic xử lý phản hồi nếu cần
    revalidateTag("list-users")
    return res;
};
