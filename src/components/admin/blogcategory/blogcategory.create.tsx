'use client'
import { Modal, Form, Input, Button, message, notification } from 'antd';
import React from 'react';
import { handleCreateBlogCategoryAction } from '@/utils/actions/blogcategory.action'; // Function to handle blog category creation

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const BlogCategoryCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { title } = values;
        try {
            const res = await handleCreateBlogCategoryAction({
                title
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Danh mục blog đã được tạo thành công");
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
            title="Tạo Danh Mục Blog"
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

export default BlogCategoryCreate;
