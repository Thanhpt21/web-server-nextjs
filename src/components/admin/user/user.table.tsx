'use client'
import { Button, Pagination, Popconfirm, Table } from "antd"
import UserCreate from "./user.create"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons"
import { handleDeleteUserAction } from "@/utils/actions"
import UserUpdate from "./user.update"

interface IProps {
    data: any,
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    }
}

const UserTable = (props: IProps) => {
    const {data, meta} = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
    const [dataUpdate, setDataUpdate] = useState<any>(null);


    const columns = [
        {
            title: 'STT',
            render: (_: any, record: any, index: any) => {
                return (
                    <>{(index + 1) + (meta.current - 1)*(meta.pageSize)}</>
                )
            }
        },
      
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Hành động',
            width: 110,
            render: (text: any, record: any, index: any) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <EditTwoTone 
                            twoToneColor="#f57800"
                            style={{ cursor: "pointer", marginRight: '8px' }}
                            onClick={() => {
                                setIsUpdateModalOpen(true)
                                setDataUpdate(record)
                            }}
                        />
                        <Popconfirm
                            placement="leftTop"
                            title="Xóa"
                            description="Xóa người dùng này"
                            onConfirm={() => handleDeleteUserAction(record?._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </div>
                );
            }
        }
        
    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            // Kiểm tra nếu searchParams không phải là null
            if (searchParams) {
                const params = new URLSearchParams(searchParams as URLSearchParams); // Type assertion
                params.set('current', pagination.current.toString()); // Pagination.current là number, cần chuyển thành string
                replace(`${pathname}?${params.toString()}`);
            } else {
                // Nếu searchParams là null, tạo URLSearchParams trống
                const params = new URLSearchParams();
                params.set('current', pagination.current.toString());
                replace(`${pathname}?${params.toString()}`);
            }
        }
    };

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách tài khoản</span>
                <Button
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)} // Thêm sự kiện onClick để mở modal
                >
                    Tạo
                </Button>
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: false,
                        total: meta.total,
                        showTotal: (total, range) => {return (<div>{range[0]}-{range[1]} của {total} items</div>)}
                    }
                }
                onChange={onChange}
            />
            <UserCreate 
            isCreateModalOpen={isCreateModalOpen}
            setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UserUpdate 
              isUpdateModalOpen={isUpdateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              dataUpdate={dataUpdate}
              setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default UserTable;