import { Modal, Form, Input, Button, message, notification, Select, Checkbox, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import MarkdownEditer from '@/components/common/MarkdownEditer'; 
import { handleCreateProductAction, fetchCategories, fetchBrandByCategory, fetchColors } from '@/utils/actions/product.action'; 
import UploadImage from '@/components/common/UploadImage'; 
import { handleSlugify, isValidMongoId } from '@/utils/helpers';
import UploadImageArray from '@/components/common/UploadImageArray';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    token: string;
}

const ProductCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen, token }) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState<string>('');
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [thumb, setThumb] = useState<string | undefined>();
    const [images, setImages] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

    useEffect(() => {
        if (isCreateModalOpen) {
            const fetchData = async () => {
                try {
                    const [categoryRes, colorRes] = await Promise.all([
                        fetchCategories(),
                        fetchColors()
                    ]);

                    if (categoryRes?.data?.data) {
                        setCategories(categoryRes.data.data);
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: categoryRes?.message || "Đã xảy ra lỗi khi lấy danh mục",
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
        }
    }, [isCreateModalOpen]);


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
        setIsCreateModalOpen(false);
        setDescription('');
        setThumb(undefined);
        setImages([]);
        setSelectedCategory(undefined);
    };

    const onFinish = async (values: any) => {
        const { title, code, price, discount, category, brand } = values;
        const slug = handleSlugify(title);

        try {
            const res = await handleCreateProductAction({
                title,
                slug,
                code,
                description,
                price: Number(price),
                discount: Number(discount) || 0,
                category,
                brand,
                colors: selectedColors,
                thumb,
                images
            });

            if (res?.data) {
                handleCloseModal();
                message.success("Sản phẩm đã được tạo thành công");
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

    const handleColorChange = (colorId: string) => {
        setSelectedColors(prevSelectedColors =>
            prevSelectedColors.includes(colorId)
                ? prevSelectedColors.filter(c => c !== colorId)
                : [...prevSelectedColors, colorId]
        );
    };

    return (
        <Modal
            title="Tạo Sản Phẩm"
            open={isCreateModalOpen}
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
                            <Input defaultValue={0} type="number" />
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
                            <Select disabled={!selectedCategory}>
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
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductCreate;
