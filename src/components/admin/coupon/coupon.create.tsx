'use client';

import { Modal, Form, Input, Button, DatePicker, InputNumber, message, notification, Row, Col } from 'antd';
import React from 'react';
import { handleCreateCouponAction } from '@/utils/actions/coupon.action'; // Function to handle coupon creation

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CouponCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { name, discount, expiry, useLimit, minPrice } = values;
        try {
            const res = await handleCreateCouponAction({
                name,
                discount,
                expiry,
                useLimit,
                minPrice
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Coupon đã được tạo thành công");
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
            title="Tạo Coupon"
            open={isCreateModalOpen}
            onCancel={handleCloseModal}
            footer={null} // Use custom footer
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên Coupon"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên coupon!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Giảm giá"
                            name="discount"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày hết hạn"
                            name="expiry"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}
                        >
                            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Giới hạn sử dụng"
                            name="useLimit"
                            rules={[{ required: true, message: 'Vui lòng nhập giới hạn sử dụng!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Giá tối thiểu"
                            name="minPrice"
                            rules={[{ required: true, message: 'Vui lòng nhập giá tối thiểu!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
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

export default CouponCreate;
