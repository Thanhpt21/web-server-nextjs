import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message, notification, Checkbox, Row, Col } from 'antd';
import UploadImageCrop from '@/components/common/UploadImageCrop';
import { handleUpdateBrandAction, fetchCategories } from '@/utils/actions/brand.action';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const BrandUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>(dataUpdate?.image);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        if (isUpdateModalOpen) {
            fetchCategories().then(res => {
                if (res?.data) {
                    setCategories(res.data.data);
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: res?.message || "Đã xảy ra lỗi khi lấy danh mục",
                    });
                }
            });

            if (dataUpdate) {
                form.setFieldsValue({
                    title: dataUpdate.title,
                });
                setImageUrl(dataUpdate.image);
                const categoryIds = dataUpdate.category.map((cat: any) => cat._id);
                setSelectedCategories(categoryIds);
            }
        }
    }, [isUpdateModalOpen, dataUpdate, form]);

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        setImageUrl(undefined);
        setSelectedCategories([]);
    };

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { title } = values;
            try {
                const res = await handleUpdateBrandAction({
                    _id: dataUpdate._id,
                    title,
                    image: imageUrl,
                    category: selectedCategories // Update this field
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật thương hiệu thành công');
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

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter(id => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
    };

    return (
        <Modal
            title="Cập nhật Thương Hiệu"
            open={isUpdateModalOpen}
            onCancel={handleCloseModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Hình ảnh"
                            name="image"
                        >
                            <UploadImageCrop
                                imageUrl={imageUrl}
                                onImageUpload={(url) => setImageUrl(url)}
                                token={token}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Tên thương hiệu"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Danh mục"
                        >
                            {categories.map(cat => (
                                <Checkbox
                                    key={cat._id}
                                    checked={selectedCategories.includes(cat._id)}
                                    onChange={() => handleCategoryChange(cat._id)}
                                >
                                    {cat.title}
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

export default BrandUpdate;
