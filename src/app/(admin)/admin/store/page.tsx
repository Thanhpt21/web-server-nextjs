// pages/manage-store.tsx

import { auth } from "@/auth";
import StoreTable from "@/components/admin/store/store.table";
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageStorePage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stores`, // Updated endpoint for stores
        method: "GET",
        queryParams: {  
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-stores'] } // Updated tag for store
        }
    });

    return (
        <div>
            <StoreTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageStorePage;
