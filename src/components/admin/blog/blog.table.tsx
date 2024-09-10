'use client';

import { Button, Popconfirm, Table, Select } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import BlogCreate from "./blog.create";
import BlogUpdate from "./blog.update";
import { handleDeleteBlogAction, fetchBlogCategories } from "@/utils/actions/blog.action"; // Cập nhật import

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

const BlogTable = (props: IProps) => {
    const { data, meta, token } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);




    useEffect(() => {
        fetchBlogCategories().then(res => {
            if (res?.data) {
                setCategories(res.data.data);
            }
        });
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

    // Handle reset
    const handleReset = () => {
        setSelectedCategory(undefined);
        const params = new URLSearchParams(searchParams as URLSearchParams);
        params.delete('category'); // Remove category parameter
        params.delete('current');
        replace(`${pathname}?${params.toString()}`);
    };




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
                    alt="Blog image"
                    className="w-10 h-10 object-cover"
                />
            </div>
            ),
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            render: (category: any[]) => (
                <span>{category.map(cat => cat.title).join(', ')}</span>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Lượt xem',
            dataIndex: 'numberViews',
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
                        description="Bạn có chắc chắn muốn xóa bài viết này không?"
                        onConfirm={() => handleDeleteBlogAction(record._id)}
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
                <span>Danh sách bài viết</span>
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
            <BlogCreate
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                token={token}
            />
            <BlogUpdate
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                token={token}
            />
        </>
    );
};

export default BlogTable;
