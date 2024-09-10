import { auth } from "@/auth";
import ShipTable from "@/components/admin/ship/ship.table"; // Đảm bảo đường dẫn và tên component đúng
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageShipPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ships`,
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-ships'] }
        }
    });

    return (
        <div>
            <ShipTable 
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageShipPage;
