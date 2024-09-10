'use client';

import { Button, Popconfirm, Table, Select, Tag, Menu, Dropdown } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EnquiryCreate from "./enquiry.create";
import { handleDeleteEnquiryAction, fetchEnquiries, handleUpdateEnquiryAction } from "@/utils/actions/enquiry.action";
import { statusEnquiry } from "@/utils/contants";


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

const EnquiryTable = (props: IProps) => {
    const { data, meta } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const handleStatusChange = async (id: string, status: number) => {
        try {
            await handleUpdateEnquiryAction({ _id: id, status }); // Ensure correct data format
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const statusMenu = (id: string) => (
        <Menu onClick={({ key }) => handleStatusChange(id, Number(key))}> {/* Convert key to number */}
            {statusEnquiry.map(option => (
                <Menu.Item key={option.value} icon={<Tag color={option.color}>{option.label}</Tag>}>
                    
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
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'comment',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: number, record: any) => {
                const statusOption = statusEnquiry.find(option => option.value === status);
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
                        description="Bạn có chắc chắn muốn xóa yêu cầu này không?"
                        onConfirm={() => handleDeleteEnquiryAction(record._id)}
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

    // Handle reset
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
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách yêu cầu</span>
                <Button
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Tạo mới
                </Button>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: '10px' }}>
                <Select
                    style={{ width: 200 }}
                    placeholder="Chọn trạng thái"
                    value={selectedStatus}
                    onChange={value => setSelectedStatus(value)}
                >
                    {statusEnquiry?.map(option => (
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
            <EnquiryCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
        </>
    );
};

export default EnquiryTable;
