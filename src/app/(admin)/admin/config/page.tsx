// pages/manage-configs.tsx

import { auth } from "@/auth";
import ConfigTable from "@/components/admin/config/config.table"; // Cập nhật đường dẫn và tên component nếu khác
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageConfigsPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth(); // Nếu không cần token, có thể loại bỏ dòng này

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/configs`, // Cập nhật URL cho configs
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        // Nếu không cần token, có thể loại bỏ headers
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-configs'] } // Thay đổi tag cho danh sách configs
        }
    });

    return (
        <div>
            <ConfigTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageConfigsPage;
