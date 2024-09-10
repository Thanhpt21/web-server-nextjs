'use client'
import { Button, Popconfirm, Table } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import CategoryCreate from "./category.create";
import CategoryUpdate from "./category.update";
import { handleDeleteCategoryAction } from "@/utils/actions/category.action"; // Hàm xử lý xóa danh mục

interface IProps {
    data: any[],
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
    token: any
}

const CategoryTable = (props: IProps) => {
    const { data, meta, token } = props;
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
            title: 'Hình ảnh',
            width: 100,
            dataIndex: 'image',
            render: (image: string) => (
                <div className="flex justify-center items-center">
                <img
                    src={image}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
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
                            description="Bạn có chắc chắn muốn xóa danh mục này không?"
                            onConfirm={() => handleDeleteCategoryAction(record._id)}
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
                <span>Danh sách danh mục</span>
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
            <CategoryCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                token={token}
            />
            <CategoryUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                token={token}
            />
        </>
    );
}

export default CategoryTable;
