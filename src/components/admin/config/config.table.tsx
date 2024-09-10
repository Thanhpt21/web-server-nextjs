'use client';

import { EditTwoTone } from "@ant-design/icons";
import { Table, Button } from "antd";
import { useState } from "react";
import ConfigUpdate from "./config.update"; // Giả sử bạn có component này để cập nhật cấu hình

interface IProps {
    data: any[];
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    token: any
}

const ConfigTable = (props: IProps) => {
    const { data, meta, token } = props;
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const columns = [
        {
            title: 'Logo',
            width: 200,
            dataIndex: 'logo',
            render: (logo: string) => (
                <div className="flex justify-center items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-full object-cover"
                    />
                </div>
            )
        },
        {
            title: 'Favicon',
            width: 100,
            dataIndex: 'favicon',
            render: (favicon: string) => (
                <div className="flex justify-center items-center">
                    <img
                        src={favicon}
                        alt="favicon"
                        className="w-full object-cover"
                    />
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        // Thêm các cột khác tương ứng với các trường trong Config Schema

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
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách Cấu hình</span>
                {/* Có thể thêm các nút hoặc chức năng khác nếu cần */}
            </div>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />
            {dataUpdate && (
                <ConfigUpdate
                    isUpdateModalOpen={isUpdateModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    token={token}
                />
            )}
        </>
    );
}

export default ConfigTable;
