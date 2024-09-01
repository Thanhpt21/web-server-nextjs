// components/admin/blog/blog.update.tsx

import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, message, notification, Checkbox, Row, Col, Form } from 'antd';
import UploadImage from '@/components/common/UploadImage';
import { handleUpdateBlogAction, fetchBlogCategories } from '@/utils/actions/blog.action';
import DynamicContentForm from '@/components/common/DynamicContentForm';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const BlogUpdate: React.FC<IProps> = ({ isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>(dataUpdate?.image);
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    
    const [contentSections, setContentSections] = useState<any[]>(dataUpdate?.content || []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    useEffect(() => {
        if (isUpdateModalOpen) {
            fetchBlogCategories().then(res => {
                if (res?.data) {
                    setBlogCategories(res.data.data);
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: res?.message || "Đã xảy ra lỗi khi lấy danh mục blog",
                    });
                }
            });

            if (dataUpdate) {
                form.setFieldsValue({
                    title: dataUpdate.title,
                    description: dataUpdate.description,
                });
                setImageUrl(dataUpdate.image);
                setContentSections(dataUpdate.content);
                const categoryIds = dataUpdate.category.map((cat: any) => cat._id);
                setSelectedCategories(categoryIds);
               
            }
        }
    }, [isUpdateModalOpen, dataUpdate, form]);

    const handleCloseModal = () => {
        form.resetFields();
        setImageUrl(undefined);
        setSelectedCategories([]);
        setContentSections([]);
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };


    const onFinish = async (values: any) => {
        const { title, description } = values;
        try {
            const res = await handleUpdateBlogAction({
                _id: dataUpdate._id,
                title,
                image: imageUrl,
                description,
                content: contentSections,
                category: selectedCategories,
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Blog đã được cập nhật thành công");
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

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter(id => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
    };

    return (
        <Modal
            title="Cập nhật Blog"
            open={isUpdateModalOpen}
            onCancel={handleCloseModal}
            footer={null}
            style={{ top: 20 }}
            width={800}
            bodyStyle={{ height: '600px', overflowY: 'auto' }}
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
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <UploadImage
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
                            label="Tên Blog"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tên blog!' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Danh mục"
                        >
                            {blogCategories.map(cat => (
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
                    <Col span={24}>
                        <DynamicContentForm 
                            onContentChange={setContentSections} 
                            initialContent={contentSections} 
                        />
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

export default BlogUpdate;
