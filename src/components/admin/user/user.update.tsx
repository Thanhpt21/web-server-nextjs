'use client'
import React, { useEffect, useState } from 'react';
import { handleUpdateUserAction } from '@/utils/actions/user.actions';
import { Modal, Form, Input, Button, message, notification, Row, Col } from 'antd';
import UploadImage from '@/components/common/UploadImage'; // Import the UploadImage component

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: (data: any) => void;
  token: string;
}

const UserUpdate: React.FC<IProps> = (props) => {
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
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address
      });
      setImageUrl(dataUpdate.image); // Set initial image URL
    }
  }, [dataUpdate, form]);

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { name, phone, address } = values;
      try {
        const res = await handleUpdateUserAction({
          _id: dataUpdate._id,
          name,
          phone,
          address,
          image: imageUrl // Include image URL in the payload
        });
        if (res?.data) {
          handleCloseModal();
          message.success('Cập nhật thành công');
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
      title="Cập nhật Người Dùng"
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
              label="Ảnh đại diện"
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
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
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

export default UserUpdate;
