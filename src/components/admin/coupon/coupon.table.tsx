'use client';

import { Button, Popconfirm, Table } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import CouponCreate from "./coupon.create"; 
import CouponUpdate from "./coupon.update"; 
import { handleDeleteCouponAction } from "@/utils/actions/coupon.action";
import { formatCurrency } from "@/utils/helpers";


interface IProps {
    data: any[],
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
}

const CouponTable = (props: IProps) => {
    const { data, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const columns = [
        {
            title: 'STT',
            width: 20,
            render: (_: any, record: any, index: any) => {
                return (
                    <div className="flex justify-center items-center">
                        {(index + 1) + (meta.current - 1) * (meta.pageSize)}
                    </div>
                );
            }
        },
        {
            title: 'Tên Coupon',
            dataIndex: 'name',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiry',
            render: (expiry: Date) => (
                <span>{new Date(expiry).toLocaleDateString()}</span>
            ),
        },
        {
            title: 'Giảm giá (đ)',
            dataIndex: 'discount',
            render: (discount: number) => (
                <span>{formatCurrency(discount)}</span>
            ),
        },
        {
            title: 'Giá tối thiểu',
            dataIndex: 'minPrice',
            render: (minPrice: number) => (
                <span>{formatCurrency(minPrice)}</span>
            ),
        },
        {
            title: 'Giới hạn sử dụng',
            dataIndex: 'useLimit',
        },
        {
            title: 'Số lần đã sử dụng',
            dataIndex: 'useCount',
        },
        {
            title: 'Hành động',
            width: 110,
            render: (text: any, record: any) => {
                return (
                    <div className="flex justify-center items-center space-x-4">
                        <EditTwoTone
                            twoToneColor="#f57800"
                            className="cursor-pointer"
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataUpdate(record);
                            }}
                        />
                        <Popconfirm
                            placement="leftTop"
                            title="Xóa"
                            description="Bạn có chắc chắn muốn xóa coupon này không?"
                            onConfirm={() => handleDeleteCouponAction(record._id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <span className="cursor-pointer">
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];

    const onChange = (pagination: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams as URLSearchParams);
            params.set('current', pagination.current.toString());
            replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách Coupon</span>
                <Button
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Tạo mới
                </Button>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: false,
                    total: meta.total,
                    showTotal: (total, range) => <div>{range[0]}-{range[1]} của {total} mục</div>
                }}
                onChange={onChange}
            />
            <CouponCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <CouponUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
}

export default CouponTable;
