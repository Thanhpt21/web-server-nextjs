// components/admin/blog/blog.create.tsx
'use client';

import { Modal, Input, Button, message, notification, Checkbox, Row, Col,Form } from 'antd';
import React, { useState, useEffect } from 'react';
import UploadImage from '@/components/common/UploadImage'; // Import UploadImage component
import { handleCreateBlogAction } from '@/utils/actions/blog.action'; // Function to handle blog creation
import { fetchBlogCategories } from '@/utils/actions/blog.action'; // Function to fetch BlogCategories
import DynamicContentForm from '@/components/common/DynamicContentForm'; // Import DynamicContentForm

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
    token: string; // Pass token as a prop
}

const BlogCreate: React.FC<IProps> = ({ isCreateModalOpen, setIsCreateModalOpen, token }) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [contentSections, setContentSections] = useState<any[]>([]);
    const [form] = Form.useForm();

    console.log("contentSections", contentSections)

    useEffect(() => {
        // Fetch blog categories when the modal is opened
        if (isCreateModalOpen) {
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
        }
    }, [isCreateModalOpen]);

    const handleCloseModal = () => {
        form.resetFields();
        setImageUrl(undefined); // Reset imageUrl
        setSelectedCategories([]); // Reset selected categories
        setContentSections([]); // Reset content sections
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const {title, description} = values;
        console.log("value", values)
        try {
            const res = await handleCreateBlogAction({
                title,
                image: imageUrl,
                description,
                content: contentSections,
                category: selectedCategories
            });
            if (res?.data) {
                handleCloseModal();
                message.success("Blog đã được tạo thành công");
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

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(categoryId)
                ? prevSelectedCategories.filter(id => id !== categoryId)
                : [...prevSelectedCategories, categoryId]
        );
    };

    return (
        <Modal
            title="Tạo Blog"
            open={isCreateModalOpen}
            onCancel={handleCloseModal}
            footer={null} // Use custom footer
            style={{ top: 20 }} // Adjust the top margin if needed
            width={800} // Adjust width as needed
            bodyStyle={{ height: '600px', overflowY: 'auto' }} // Adjust height and enable scrolling
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
                            rules={[{ required: true, message: 'Vui lòng nhập tên tin tức!' }]}
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
                        <DynamicContentForm  initialContent={contentSections}  onContentChange={setContentSections} />
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

export default BlogCreate;
