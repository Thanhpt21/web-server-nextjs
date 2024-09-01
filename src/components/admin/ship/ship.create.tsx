'use client';

import { Modal, Form, Input, InputNumber, Button, message, notification } from 'antd';
import React from 'react';
import { handleCreateShipAction } from '@/utils/actions/ship.action'; // Đảm bảo đường dẫn đúng

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const ShipCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { province, price } = values;
        try {
            const res = await handleCreateShipAction({
                province,
                price
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Phí vận chuyển đã được tạo thành công");
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
            title="Tạo phí vận chuyển"
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
                    label="Tỉnh"
                    name="province"
                    rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber 
                        style={{ width: '100%' }} 
                        min={0} 
                       
                    />
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

export default ShipCreate;
