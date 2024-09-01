'use client';
import { Modal, Form, Input, Button, message, notification, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import UploadImage from '@/components/common/UploadImage'; // Import UploadImage component
import { handleUpdateStoreAction } from '@/utils/actions/store.action'; // Function to handle store update

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any; // Data to be updated
    setDataUpdate: (data: any) => void;
    token: string; // Pass token as a prop
}

const StoreUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>(dataUpdate?.image);

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                address: dataUpdate.address,
                phone: dataUpdate.phone,
                link: dataUpdate.link,
                iframe: dataUpdate.iframe
            });
            setImageUrl(dataUpdate.image); // Set initial image URL
        }
    }, [dataUpdate, form]);


    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setImageUrl(undefined); // Reset imageUrl
        setDataUpdate(null); // Reset update data
    };


    const onFinish = async (values: any) => {
        const { name, phone, email, address, link, iframe } = values;
        try {
            const res = await handleUpdateStoreAction({
                _id: dataUpdate._id,
                name,
                phone,
                email,
                address,
                image: imageUrl, // Include image URL in the payload
                link,
                iframe
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Cửa hàng đã được cập nhật thành công");
            } else {
                notification.error({
                    message: "Lỗi",
                    description: res?.message || "Đã xảy ra lỗi",
                });
            }
        } catch (error) {
            notification.error({
                message: "Cập nhật thất bại",
                description: "Có lỗi xảy ra khi cập nhật dữ liệu."
            });
        }
    };

    return (
        <Modal
            title="Cập Nhật Cửa Hàng"
            open={isUpdateModalOpen}
            onCancel={handleCloseModal}
            footer={null} // Use custom footer
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={dataUpdate}
            >
                <Row gutter={16}>
                    <Col span={24}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Tên Cửa Hàng"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Link"
                            name="link"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Iframe"
                            name="iframe"
                        >
                            <Input />
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
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StoreUpdate;
