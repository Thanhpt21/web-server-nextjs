// pages/manage-blog-category.tsx

import { auth } from "@/auth";
import BlogCategoryTable from "@/components/admin/blogcategory/blogcategory.table"; // Cần thay đổi đường dẫn và tên component nếu khác
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageBlogCategoryPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-categories`, // Cập nhật URL cho blog categories
        method: "GET",
        queryParams: {  
            current,
            pageSize,
            
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-blog-categories'] } // Thay đổi tag cho danh mục blog
        }
    });

    return (
        <div>
            <BlogCategoryTable 
              
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageBlogCategoryPage;
