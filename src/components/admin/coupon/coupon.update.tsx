'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber, message, notification, Row, Col } from 'antd';
import { handleUpdateCouponAction } from '@/utils/actions/coupon.action'; // Function to handle coupon update
import moment from 'moment';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
}

const CouponUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate }) => {
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                discount: dataUpdate.discount,
                expiry: dataUpdate.expiry ? moment(dataUpdate.expiry) : null,
                useLimit: dataUpdate.useLimit,
                minPrice: dataUpdate.minPrice
            });
        }
    }, [dataUpdate, form]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { name, discount, expiry, useLimit, minPrice } = values;
            try {
                const res = await handleUpdateCouponAction({
                    _id: dataUpdate._id,
                    name,
                    discount,
                    expiry,
                    useLimit,
                    minPrice
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật coupon thành công');
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
            title="Cập nhật Coupon"
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
                            label="Giảm giá (đ)"
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
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CouponUpdate;
