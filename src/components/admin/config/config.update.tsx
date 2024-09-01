'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, notification, Row, Col } from 'antd';
import { handleUpdateConfigAction } from '@/utils/actions/config.action'; // Function to handle config update
import UploadImage from '@/components/common/UploadImage'; // Import the UploadImage component

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const ConfigUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [logoUrl, setLogoUrl] = useState<string | undefined>(dataUpdate?.logo);
    const [faviconUrl, setFaviconUrl] = useState<string | undefined>(dataUpdate?.favicon);

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        setLogoUrl(dataUpdate?.logo); // Reset logoUrl to original logo
        setFaviconUrl(dataUpdate?.favicon); // Reset faviconUrl to original favicon
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                phone: dataUpdate.phone,
                email: dataUpdate.email,
                address: dataUpdate.address,
                facebook: dataUpdate.facebook,
                zalo: dataUpdate.zalo,
                instagram: dataUpdate.instagram,
                tiktok: dataUpdate.tiktok,
                youtube: dataUpdate.youtube,
                messenger: dataUpdate.messenger
            });
            setLogoUrl(dataUpdate.logo); // Set initial logo URL
            setFaviconUrl(dataUpdate.favicon); // Set initial favicon URL
        }
    }, [dataUpdate, form]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { name, phone, email, address, facebook, zalo, instagram, tiktok, youtube, messenger } = values;
            try {
                const res = await handleUpdateConfigAction({
                    _id: dataUpdate._id,
                    name,
                    phone,
                    email,
                    address,
                    facebook,
                    zalo,
                    instagram,
                    tiktok,
                    youtube,
                    messenger,
                    logo: logoUrl,
                    favicon: faviconUrl
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật cấu hình thành công');
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
            title="Cập nhật Cấu hình"
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
                            label="Logo"
                            name="logo"
                        >
                            <UploadImage
                                imageUrl={logoUrl}
                                onImageUpload={(url) => setLogoUrl(url)}
                                token={token}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Favicon"
                            name="favicon"
                        >
                            <UploadImage
                                imageUrl={faviconUrl}
                                onImageUpload={(url) => setFaviconUrl(url)}
                                token={token}
                            />
                        </Form.Item>
                    </Col>
                </Row>
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
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Facebook"
                            name="facebook"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Zalo"
                            name="zalo"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Instagram"
                            name="instagram"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="TikTok"
                            name="tiktok"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="YouTube"
                            name="youtube"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Messenger"
                            name="messenger"
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
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConfigUpdate;
