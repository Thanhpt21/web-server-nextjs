import { auth } from "@/auth";
import OrderTable from "@/components/admin/order/order.table"; 
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageOrderPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const status = props?.searchParams?.status;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`, 
        method: "GET",
        queryParams: {
            current,
            pageSize,
            ...(status ? { status } : {}),
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-orders'] } // Đổi tag thành list-orders
        }
    });

    return (
        <div>
            <OrderTable 
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageOrderPage;
