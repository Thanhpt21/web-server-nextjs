import { auth } from "@/auth";
import ProductTable from "@/components/admin/product/product.table"; // Đổi thành ProductTable
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageProductPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const category = props?.searchParams?.category;
    const brand = props?.searchParams?.brand;
    const status = props?.searchParams?.status;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`, // Đổi thành products
        method: "GET",
        queryParams: {
            current,
            pageSize,
            ...(category ? { category } : {}),
            ...(brand ? { brand } : {}),
            ...(status ? { status } : {}),
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-products'] } // Đổi tag thành list-products
        }
    });

    return (
        <div>
            <ProductTable 
                token={session?.user?.access_token}
                data={res?.data?.data || []}
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageProductPage;
