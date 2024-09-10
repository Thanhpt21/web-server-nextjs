'use client'

import { Button, Popconfirm, Select, Table } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteTwoTone, EditTwoTone, SkinOutlined } from "@ant-design/icons";
import ProductCreate from "./product.create";
import ProductUpdate from "./product.update";
import { handleDeleteProductAction, getVariantByProduct, fetchCategories } from "@/utils/actions/product.action"; // Hàm xử lý xóa sản phẩm
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
    token: any
}

const ProductTable = (props: IProps) => {
    const { data, meta, token } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

      // State to keep track of current and pageSize
      const [currentPage, setCurrentPage] = useState(meta.current);
      const [pageSize, setPageSize] = useState(meta.pageSize);
  
      useEffect(() => {
          setCurrentPage(meta.current);
          setPageSize(meta.pageSize);
      }, [meta.current, meta.pageSize]);

     // Fetch categories on mount
     useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const res = await fetchCategories();
                if (res?.data) {
                    setCategories(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategoriesData();
    }, []);

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
            title: "Danh mục / Thương hiệu",
            render: (item: any, record: any) => (
                <span>{record?.category?.title} / {record?.brand?.title}</span>
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
                        description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                        onConfirm={() => handleDeleteProductAction(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <span className="cursor-pointer">
                            <DeleteTwoTone twoToneColor="#ff4d4f" />
                        </span>
                    </Popconfirm>
                    <SkinOutlined
                        twoToneColor="#52c41a"
                        className="cursor-pointer"
                        onClick={() => replace(`/admin/variant/${record._id}?currentProduct=${currentPage}`)}
                    />
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

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams as URLSearchParams);
        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        params.set('current', '1');
        replace(`${pathname}?${params.toString()}`);
    };


    const handleReset = () => {
        setSelectedCategory(undefined);
        const params = new URLSearchParams(searchParams as URLSearchParams);
        params.delete('category'); 
        params.delete('current');
        replace(`${pathname}?${params.toString()}`);
    };


    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20
            }}>
                <span>Danh sách sản phẩm</span>
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
                    placeholder="Chọn danh mục"
                    value={selectedCategory}
                    onChange={value => setSelectedCategory(value)}
                >
                    {categories.map(cat => (
                        <Option key={cat._id} value={cat._id}>{cat.title}</Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
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
            <ProductCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                token={token}
            />
            <ProductUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                token={token}
            />
        </>
    );
}

export default ProductTable;
