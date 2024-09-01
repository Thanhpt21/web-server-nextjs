'use client';

import { Modal, Form, Input, Button, message, notification, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { handleCreateBrandAction } from '@/utils/actions/brand.action'; // Function to handle brand creation
import { fetchCategories } from '@/utils/actions/brand.action'; // Function to fetch categories
import UploadImageCrop from '@/components/common/UploadImageCrop';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    token: string; // Pass token as a prop
}

const BrandCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen, token }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        if (isCreateModalOpen) {
            fetchCategories().then(res => {
                if (res?.data) {
                    setCategories(res.data.data);
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: res?.message || "Đã xảy ra lỗi khi lấy danh mục",
                    });
                }
            });
        }
    }, [isCreateModalOpen]);


    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
        setImageUrl(undefined);
        setSelectedCategories([]);
    };

    const onFinish = async (values: any) => {
        if (loading) return; // Prevent multiple submissions
        setLoading(true);
        const { title } = values;
        try {
            const res = await handleCreateBrandAction({
                title,
                image: imageUrl,
                category: selectedCategories
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Thương hiệu đã được tạo thành công");
            } else {
                notification.error({
                    message: "Lỗi",
                    description: res?.message || "Đã xảy ra lỗi",
                });
            }
        } catch (error) {
            notification.error({
                message: "Tạo thất bại",
                description: "Có lỗi xảy ra khi tạo dữ liệu."
            });
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter(id => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
    };

    return (
        <Modal
            title="Tạo Thương Hiệu"
            open={isCreateModalOpen}
            onCancel={handleCloseModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Hình ảnh"
                    name="image"
                >
                    <UploadImageCrop
                        imageUrl={imageUrl}
                        onImageUpload={(url) => setImageUrl(url)}
                        token={token}
                    />
                </Form.Item>
                <Form.Item
                    label="Tên thương hiệu"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                >
                    {categories.map(cat => (
                        <Checkbox
                            key={cat._id}
                            checked={selectedCategories.includes(cat._id)}
                            onChange={() => handleCategoryChange(cat._id)}
                        >
                            {cat.title}
                        </Checkbox>
                    ))}
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button
                        style={{ marginLeft: '8px' }}
                        type="primary"
                        htmlType="submit"
                        loading={loading} // Add loading state to button
                    >
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BrandCreate;
