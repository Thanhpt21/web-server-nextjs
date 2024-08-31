import { auth } from "@/auth";
import BrandTable from "@/components/admin/brand/brand.table"; // Đổi thành BrandTable
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageBrandPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/brands`, // Đổi thành brands
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-brands'] } // Đổi tag thành list-brands
        }
    });

    return (
        <div>
            <BrandTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageBrandPage;
