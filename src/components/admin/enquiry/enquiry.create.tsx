'use client';

import { Modal, Form, Input, Button, DatePicker, InputNumber, message, notification, Row, Col, Select } from 'antd';
import React from 'react';
import { handleCreateEnquiryAction } from '@/utils/actions/enquiry.action'; // Function to handle enquiry creation


const { Option } = Select;

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const EnquiryCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const { name, phone, email, comment } = values;
        try {
            const res = await handleCreateEnquiryAction({
                name,
                phone,
                email,
                comment,
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Yêu cầu đã được tạo thành công");
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
            title="Tạo Yêu Cầu"
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
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Ghi chú"
                            name="comment"
                        >
                            <Input.TextArea rows={4} />
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

export default EnquiryCreate;
