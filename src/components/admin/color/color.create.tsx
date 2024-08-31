'use client';

import { Modal, Form, Input, Button, ColorPicker, message, notification } from 'antd';
import React from 'react';
import { handleCreateColorAction } from '@/utils/actions/color.action'; // Function to handle color creation

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const ColorCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { title, code } = values;
        try {
            const res = await handleCreateColorAction({
                title,
                code
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Màu đã được tạo thành công");
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
            title="Tạo Màu"
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
                    label="Tên màu"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tên màu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã màu"
                    name="code"
                    rules={[{ required: true, message: 'Vui lòng chọn màu!' }]}
                >
                    <Input type="color" />
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

export default ColorCreate;
