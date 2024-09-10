'use client'

import { Modal, Form, Input, Button, message, notification, Checkbox, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { handleUpdateVariantAction, fetchColors } from '@/utils/actions/variant.action'; // Import action functions
import UploadImage from '@/components/common/UploadImage'; // Import UploadImage component
import UploadImageArray from '@/components/common/UploadImageArray';
import { useParams } from 'next/navigation';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const UpdateVariant: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [colors, setColors] = useState<any[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [thumb, setThumb] = useState<string | undefined>();
    const [images, setImages] = useState<string[]>([]);

    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
        if (isUpdateModalOpen) {
            const fetchData = async () => {
                try {
                    const colorRes = await fetchColors();

                    if (colorRes?.data?.data) {
                        setColors(colorRes.data.data);
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: colorRes?.message || "Đã xảy ra lỗi khi lấy màu sắc",
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: "Lỗi",
                        description: "Có lỗi xảy ra khi tải dữ liệu.",
                    });
                }
            };

            fetchData();
            if (dataUpdate) {
                form.setFieldsValue({
                    title: dataUpdate.title,
                    code: dataUpdate.code,
                    price: dataUpdate.price,
                    discount: dataUpdate.discount,
                });
                setThumb(dataUpdate.thumb);
                setImages(dataUpdate.images || []);
                const colorIds = dataUpdate.colors.map((c: any) => c._id);
                setSelectedColors(colorIds);
            }
        }
    }, [dataUpdate, form, isUpdateModalOpen]);

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setThumb(undefined);
        setImages([]);
        setSelectedColors([]);
    };

    const onFinish = async (values: any) => {
        const { title, code, price, discount } = values;

        try {
            const res = await handleUpdateVariantAction({
                _id: dataUpdate._id,
                product: productId,
                title,
                code,
                price: Number(price),
                discount: Number(discount) || 0,
                colors: selectedColors,
                thumb,
                images
            });

            if (res?.data) {
                handleCloseModal();
                message.success("Biến thể đã được cập nhật thành công");
                setDataUpdate(null); // Clear dataUpdate
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

    const handleColorChange = (colorId: string) => {
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(colorId)
                ? prevSelectedColors.filter(c => c !== colorId)
                : [...prevSelectedColors, colorId]
        );
    };

    return (
        <Modal
            title="Cập Nhật Biến Thể"
            open={isUpdateModalOpen}
            onCancel={handleCloseModal}
            footer={null}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Hình ảnh đại diện"
                        >
                            <UploadImage
                                imageUrl={thumb}
                                onImageUpload={(url) => setThumb(url)}
                                token={token}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Hình ảnh mô tả"
                        >
                            <UploadImageArray
                                imageUrls={images}
                                onImagesUpload={(url) => setImages(url)}
                                token={token}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Mã SP"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã SP!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Giảm giá"
                            name="discount"
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Màu sắc"
                        >
                            {colors.map((color: any) => (
                                <Checkbox
                                    key={color._id}
                                    checked={selectedColors.includes(color._id)}
                                    onChange={() => handleColorChange(color._id)}
                                >
                                    {color.title}
                                </Checkbox>
                            ))}
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

export default UpdateVariant;
