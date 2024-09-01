// pages/manage-coupon.tsx

import { auth } from "@/auth";
import CouponTable from "@/components/admin/coupon/coupon.table"; // Cần thay đổi đường dẫn và tên component nếu khác
import { sendRequest } from "@/utils/api";

interface IProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const ManageCouponPage = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();

    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/coupons`, // Cập nhật URL cho coupons
        method: "GET",
        queryParams: {  
            current,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        nextOption: {
            next: { tags: ['list-coupons'] } // Thay đổi tag cho danh sách coupon
        }
    });

    return (
        <div>
            <CouponTable 
                data={res?.data?.data || []}  
                meta={res?.data?.meta}
            />
        </div>
    );
}

export default ManageCouponPage;
