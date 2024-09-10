import { auth } from "@/auth";
import ColorTable from "@/components/admin/color/color.table"; 
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
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/colors`,
        method: "GET",
        queryParams: {
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-colors'] }
        }
    });

    return (
        <div>
            <ColorTable 
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageColorPage;
