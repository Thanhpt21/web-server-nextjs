'use client'
import { Modal, Form, Input, Button, message, notification } from 'antd';
import React, { useState } from 'react';
import UploadImage from '@/components/common/UploadImage'; // Import UploadImage component
import { handleCreateCategoryAction } from '@/utils/actions/category.action'; // Function to handle category creation

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    token: string; // Pass token as a prop
}

const CategoryCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen, token }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
        setImageUrl(undefined); // Reset imageUrl
    };

    const onFinish = async (values: any) => {
        const { title } = values;
        try {
            const res = await handleCreateCategoryAction({
                title,
                image: imageUrl // Include image URL in the payload
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Danh mục đã được tạo thành công");
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
        }
    };

    return (
        <Modal
            title="Tạo Danh Mục"
            open={isCreateModalOpen}
            onCancel={handleCloseModal}
            footer={null} // Use custom footer
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
                    <UploadImage
                        imageUrl={imageUrl}
                        onImageUpload={(url) => setImageUrl(url)}
                        token={token}
                    />
                </Form.Item>
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    <Button
                        style={{ marginLeft: '8px' }}
                        type="primary"
                        htmlType="submit"
                    >
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryCreate;
