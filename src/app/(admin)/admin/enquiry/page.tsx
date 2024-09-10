import { auth } from "@/auth";
import EnquiryTable from "@/components/admin/enquiry/enquiry.table"; // Đổi thành EnquiryTable
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageEnquiryPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const status = props?.searchParams?.status
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiries`, // Đổi thành enquiries
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
            next: { tags: ['list-enquiries'] } // Đổi tag thành list-enquiries
        }
    });

    return (
        <div>
            <EnquiryTable 
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageEnquiryPage;
