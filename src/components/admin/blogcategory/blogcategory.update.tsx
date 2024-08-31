'use client'
import React, { useEffect, useState } from 'react';
import { handleUpdateBlogCategoryAction } from '@/utils/actions/blogcategory.action'; // Function to handle blog category update
import { Modal, Form, Input, Button, message, notification, Row, Col } from 'antd';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
}

const BlogCategoryUpdate: React.FC<IProps> = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                title: dataUpdate.title
            });
        }
    }, [dataUpdate, form]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { title } = values;
            try {
                console.log('Update payload:', {
                    _id: dataUpdate._id,
                    title
                });
                const res = await handleUpdateBlogCategoryAction({
                    _id: dataUpdate._id,
                    title
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật danh mục blog thành công');
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
            title="Cập nhật Danh Mục Blog"
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
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
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

export default BlogCategoryUpdate;
