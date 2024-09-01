'use client'

import { Modal, Form, Input, Button, message, notification, Select, Checkbox, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import MarkdownEditer from '@/components/common/MarkdownEditer'; // Import Markdown editor
import { handleUpdateProductAction, fetchCategories, fetchBrandByCategory, fetchColors } from '@/utils/actions/product.action'; // Import action functions
import UploadImage from '@/components/common/UploadImage'; // Import UploadImage component
import { handleSlugify, isValidMongoId } from '@/utils/helpers';
import UploadImageArray from '@/components/common/UploadImageArray';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const UpdateProduct: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState<string>('');
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [thumb, setThumb] = useState<string | undefined>();
    const [images, setImages] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();


    useEffect(() => {
        if (isUpdateModalOpen) {
            const fetchData = async () => {
                try {
                    const [categoryRes, colorRes, brandRes] = await Promise.all([
                        fetchCategories(),
                        fetchColors(),
                        fetchBrandByCategory(dataUpdate.category._id)
                    ]);

                    if (categoryRes?.data?.data) {
                        setCategories(categoryRes.data.data);
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: categoryRes?.message || "Đã xảy ra lỗi khi lấy danh mục",
                        });
                    }

                     if (brandRes?.data) {
                        setBrands(brandRes.data);
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: brandRes?.message || "Đã xảy ra lỗi khi lấy thương hiệu",
                        });
                    }


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
                    category: dataUpdate.category._id,
                    brand: dataUpdate.brand._id,
                    description: dataUpdate.description,
                });
                setDescription(dataUpdate.description || '');
                setThumb(dataUpdate.thumb);
                setImages(dataUpdate.images || []);
                const colorIds = dataUpdate.colors.map((c: any) => c._id);
                setSelectedColors(colorIds);
            }
        }
    }, [dataUpdate, form, isUpdateModalOpen]);

    useEffect(() => {
        if (selectedCategory) {
            const fetchBrandsByCategory = async () => {
                try {
                    const brandRes = await fetchBrandByCategory(selectedCategory);
                    if (brandRes?.data) {
                        setBrands(brandRes.data);
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: brandRes?.message || "Đã xảy ra lỗi khi lấy thương hiệu",
                        });
                    }
                } catch (error) {
                    notification.error({
                        message: "Lỗi",
                        description: "Có lỗi xảy ra khi tải dữ liệu.",
                    });
                }
            };
            fetchBrandsByCategory();
        } else {
            setBrands([]);
        }
    }, [selectedCategory]);


    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDescription('');
        setThumb(undefined);
        setImages([]);
        setSelectedColors([]);
    };

    const onFinish = async (values: any) => {
        const { title, code, price, discount, category, brand } = values;
        const slug = handleSlugify(title);

        try {
            const res = await handleUpdateProductAction({
                _id: dataUpdate._id,
                title,
                slug,
                code,
                description,
                price,
                discount,
                category,
                brand,
                colors: selectedColors,
                thumb,
                images
            });

            if (res?.data) {
                handleCloseModal();
                message.success("Sản phẩm đã được cập nhật thành công");
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
            title="Cập Nhật Sản Phẩm"
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
                            label="Mã sản phẩm"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
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
                    <Col span={12}>
                        <Form.Item
                            label="Danh mục"
                            name="category"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                        >
                            <Select 
                             placeholder="Chọn danh mục"
                             onChange={(value) => setSelectedCategory(value)}
                            >
                                {categories.map(cat => (
                                    <Select.Option key={cat._id} value={cat._id}>{cat.title}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Thương hiệu"
                            name="brand"
                            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                        >
                            <Select placeholder="Chọn thương hiệu">
                                {brands.map(brand => (
                                    <Select.Option key={brand._id} value={brand._id}>{brand.title}</Select.Option>
                                ))}
                            </Select>
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
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <MarkdownEditer
                                value={description}
                                onEditorChange={setDescription}
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

export default UpdateProduct;
