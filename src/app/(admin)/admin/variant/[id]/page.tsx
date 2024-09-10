import { auth } from "@/auth";
import VariantTable from "@/components/admin/variant/variant.table"; // Đổi thành VariantTable
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;  // Đây là productId
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
const ManageVariantPage = async (props: IProps) => {
    const productId = props.params.id; 
    const current = props.searchParams?.current ?? 1;
    const pageSize = props.searchParams?.pageSize ?? 10;
    const status = props.searchParams?.status;
    const category = props.searchParams?.category;
    const brand = props.searchParams?.brand;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/variants/${productId}`, // Thay đổi URL để bao gồm productId
        method: "GET",
        queryParams: {
            current,
            pageSize,
            ...(status ? { status } : {}),
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-variants'] } // Đổi tag thành list-variants
        }
    });

    return (
        <div>
            <VariantTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}
                meta={res?.data?.meta}
                productId={productId}
                currentProduct={current}
            />
        </div>
    );
}

export default ManageVariantPage;
