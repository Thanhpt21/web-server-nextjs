'use client'
import React, { useEffect, useState } from 'react';
import { handleUpdateCategoryAction } from '@/utils/actions/category.action'; // Function to handle category update
import { Modal, Form, Input, Button, message, notification, Row, Col } from 'antd';
import UploadImage from '@/components/common/UploadImage'; // Import the UploadImage component

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: (data: any) => void;
    token: string;
}

const CategoryUpdate: React.FC<IProps> = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate, token } = props;
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | undefined>(dataUpdate?.image);

    const handleCloseModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        setImageUrl(dataUpdate?.image); // Reset imageUrl to original image
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                title: dataUpdate.title
            });
            setImageUrl(dataUpdate.image); // Set initial image URL
        }
    }, [dataUpdate, form]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const { title } = values;
            try {
                console.log('Update payload:', {
                    _id: dataUpdate._id,
                    title,
                    image: imageUrl
                });
                const res = await handleUpdateCategoryAction({
                    _id: dataUpdate._id,
                    title,
                    image: imageUrl // Include image URL in the payload
                });
                if (res?.data) {
                    handleCloseModal();
                    message.success('Cập nhật danh mục thành công');
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
            title="Cập nhật Danh Mục"
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
                </Row>
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

export default CategoryUpdate;
