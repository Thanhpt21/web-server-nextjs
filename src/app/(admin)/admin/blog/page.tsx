// pages/manage-blog.tsx

import { auth } from "@/auth";
import BlogTable from "@/components/admin/blog/blog.table"; // Cập nhật đường dẫn và tên component nếu khác
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageBlogPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`, // Cập nhật URL cho blogs
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-blogs'] } // Thay đổi tag cho danh sách blog
        }
    });

    return (
        <div>
            <BlogTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageBlogPage;
