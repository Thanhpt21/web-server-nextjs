'use client';

import { Button, Popconfirm, Table, Select, Tag, Menu, Dropdown, message } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { handleDeleteOrderAction, handleUpdateOrderAction } from "@/utils/actions/order.action"; // Thay đổi action cho Order
import { statusOrder } from "@/utils/contants"; // Chỉnh sửa để phù hợp với trạng thái đơn hàng
import { formatCurrency } from "@/utils/helpers";

const { Option } = Select;

interface IProps {
    data: any[],
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
}

const OrderTable = (props: IProps) => {
    const { data, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const handleStatusChange = async (id: string, status: number) => {
        try {
            await handleUpdateOrderAction({ _id: id, status });
            message.success("Cập nhật trạng thái thành công")
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const statusMenu = (id: string) => (
        <Menu onClick={({ key }) => handleStatusChange(id, Number(key))}> {/* Convert key to number */}
            {statusOrder.map((option: any) => (
                <Menu.Item key={option.value} icon={<Tag color={option.color}>{option.label}</Tag>}>
                    {option.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        {
            title: 'STT',
            width: 20,
            render: (_: any, record: any, index: any) => (
                <div className="flex justify-center items-center">
                    {(index + 1) + (meta.current - 1) * (meta.pageSize)}
                </div>
            )
        },
        {
            title: 'ID Đơn hàng',
            dataIndex: '_id',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Tổng giá',
            dataIndex: 'total',
            render: (total: number) => (
                <span>{formatCurrency(total)}</span> // Sử dụng hàm formatCurrency nếu cần
            ),
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'methodPayment',
            render: (methodPayment: number) => (
                <span>{methodPayment === 1 ? 'Online' : 'COD'}</span> // Chỉnh sửa theo phương thức thanh toán
            ),
        },
        {
            title: 'Phương thức giao hàng',
            dataIndex: 'deliveryMethod',
            render: (deliveryMethod: number) => (
                <span>{deliveryMethod === 1 ? 'Standard' : 'Express'}</span> // Chỉnh sửa theo phương thức giao hàng
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: number, record: any) => {
                const statusOption = statusOrder.find((option: any) => option.value === status);
                return statusOption ? (
                    <Dropdown overlay={statusMenu(record._id)}>
                        <Tag color={statusOption.color} className="cursor-pointer">
                            {statusOption.label}
                        </Tag>
                    </Dropdown>
                ) : (
                    <Tag>{status}</Tag>
                );
            },
        },
        {
            title: 'Hành động',
            width: 110,
            render: (text: any, record: any) => (
                <div className="flex justify-center items-center space-x-4">
                    <Popconfirm
                        placement="leftTop"
                        title="Xóa"
                        description="Bạn có chắc chắn muốn xóa đơn hàng này không?"
                        onConfirm={() => handleDeleteOrderAction(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <span className="cursor-pointer">
                            <DeleteTwoTone twoToneColor="#ff4d4f" />
                        </span>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams as URLSearchParams);
        if (selectedStatus) {
            params.set('status', selectedStatus);
        } else {
            params.delete('status');
        }
        params.set('current', '1');
        replace(`${pathname}?${params.toString()}`);
    };

    const handleReset = () => {
        setSelectedStatus(undefined);
        const params = new URLSearchParams(searchParams as URLSearchParams);
        params.delete('status');
        params.delete('current');
        replace(`${pathname}?${params.toString()}`);
    };

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
                alignItems: "start",
                marginBottom: 20
            }}>
                <span>Danh sách Đơn hàng</span>
             
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: '10px' }}>
                <Select
                    style={{ width: 200 }}
                    placeholder="Chọn trạng thái"
                    value={selectedStatus}
                    onChange={value => setSelectedStatus(value)}
                >
                    {statusOrder?.map((option: any) => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
                <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                <Button onClick={handleReset}>Lọc lại</Button>
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
        </>
    );
};

export default OrderTable;
