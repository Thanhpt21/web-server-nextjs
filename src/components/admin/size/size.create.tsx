'use client';

import { Modal, Form, Input, Button, message, notification } from 'antd';
import React from 'react';
import { handleCreateSizeAction } from '@/utils/actions/size.action'; // Function to handle size creation

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const SizeCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { title } = values;
        try {
            const res = await handleCreateSizeAction({
                title
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Kích thước đã được tạo thành công");
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
            title="Tạo Kích Thước"
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
                    label="Tên kích thước"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tên kích thước!' }]}
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

export default SizeCreate;
