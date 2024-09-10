'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, message, notification, Row, Col } from 'antd';
import { handleUpdateShipAction } from '@/utils/actions/ship.action'; 

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
}

const ShipUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                province: dataUpdate.province,
                price: dataUpdate.price
            });
        }
    }, [dataUpdate, form]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { province, price } = values;
            try {
                console.log('Update payload:', {
                    _id: dataUpdate._id,
                    province,
                    price
                });
                const res = await handleUpdateShipAction({
                    _id: dataUpdate._id,
                    province,
                    price
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật phí vận chuyển thành công');
                } else {
                    notification.error({
                        message: 'Đã xảy ra lỗi',
                        description: res?.message
                    });
                }
            } catch (error) {
                notification.error({
                    message: 'Cập nhật thất bại',
                    description: 'Có lỗi xảy ra khi cập nhật dữ liệu.'
                });
            }
        }
    };

    return (
        <Modal
            title="Cập nhật phí vận chuyển"
            open={isUpdateModalOpen}
            onCancel={handleCloseModal}
            footer={null} // Use custom footer
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Tỉnh"
                            name="province"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
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
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ShipUpdate;
