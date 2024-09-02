'use client'

import { Button, Popconfirm, Table } from "antd";
import { usePathname, useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import VariantCreate from "./variant.create"; // Đổi thành VariantCreate
import VariantUpdate from "./variant.update"; // Đổi thành VariantUpdate
import { handleDeleteVariantAction, fetchProductById } from "@/utils/actions/variant.action"; // Hàm xử lý xóa biến thể
import { formatCurrency } from "@/utils/helpers";

interface IProps {
    data: any[],
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
    token: any,
    productId: any,
    currentProduct: any,
}

const VariantTable = (props: IProps) => {
    const { data, meta, token, productId, currentProduct } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, back } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [productName, setProductName] = useState<string | undefined>();

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const response = await fetchProductById(productId);
                    if (response?.data) {
                        setProductName(response.data.title); // Hoặc trường chứa tên sản phẩm từ dữ liệu
                    } else {
                        // Xử lý lỗi nếu không có dữ liệu
                        console.error("Không tìm thấy sản phẩm.");
                    }
                } catch (error) {
                    console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
                }
            }
        };
    
        fetchProduct();
    }, [productId]);

    console.log("prodName", productName)

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
            title: 'Hình ảnh',
            width: 100,
            dataIndex: 'thumb',
            render: (thumb: string) => (
                <div className="flex justify-center items-center">
                    <img
                        src={thumb}
                        alt="Thumbnail"
                        className="w-10 h-10 rounded object-cover"
                    />
                </div>
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'title',
        },
        {
            title: 'Mã SP',
            dataIndex: 'code',
        },
        {
            title: "Giá / Giá giảm",
            render: (text: any, record: any) => (
                <span>{formatCurrency(record?.price || 0)} / {formatCurrency(record?.discount || 0)}</span>
            ),
        },
        {
            title: "Màu sắc",
            render: (item: any, record: any) => (
                <span>{record?.colors?.map((color: any) => color?.title).join(', ')}</span>
            ),
        },
        {
            title: 'Hành động',
            width: 110,
            render: (text: any, record: any) => (
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
                        description="Bạn có chắc chắn muốn xóa biến thể này không?"
                        onConfirm={() => handleDeleteVariantAction(record._id)}
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
                <span>
                  
                    {productName ? (
                        <a onClick={() => replace(`/admin/product?current=${currentProduct}`)} className="text-gray-500 hover:text-black cursor-pointer">
                            {productName}
                        </a>
                    ) : "Loading..."} / 

                    Danh sách biến thể: 
                </span>
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
            <VariantCreate
                productId={productId}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                token={token}
            />
            <VariantUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                token={token}
            />
        </>
    );
}

export default VariantTable;
