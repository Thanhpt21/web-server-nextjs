'use client';

import { Button, Popconfirm, Table, Select } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import BrandCreate from "./brand.create";
import BrandUpdate from "./brand.update";
import { handleDeleteBrandAction, fetchCategories } from "@/utils/actions/brand.action";

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

const BrandTable = (props: IProps) => {
    const { data, meta, token } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

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
            dataIndex: 'image',
            render: (image: string) => (
                <div className="flex justify-center items-center">
                    <img
                        src={image}
                        alt="Brand Image"
                        className="w-10 h-10 object-cover"
                    />
                </div>
            )
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'title',
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            render: (categories: any[]) => (
                <span>{categories.map(cat => cat.title).join(', ')}</span>
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
                        description="Bạn có chắc chắn muốn xóa thương hiệu này không?"
                        onConfirm={() => handleDeleteBrandAction(record._id)}
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
            params.set('pageSize', pagination.pageSize.toString());
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
                <span>Danh sách thương hiệu</span>
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
            <BrandCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                token={token}
            />
            <BrandUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                token={token}
            />
        </>
    );
};

export default BrandTable;
