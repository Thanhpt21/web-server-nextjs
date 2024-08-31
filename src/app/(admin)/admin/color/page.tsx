import { auth } from "@/auth";
//import ColorTable from "@/components/admin/color/color.table"; // Thay đổi đường dẫn và tên component nếu cần
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageColorPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors`, // Cập nhật URL cho màu sắc
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-colors'] } // Thay đổi tag cho danh sách màu sắc
        }
    });

    return (
        <div>
            {/* <ColorTable 
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            /> */}
        </div>
    );
}

export default ManageColorPage;
