import { handleCreateUserAction } from '@/utils/actions/user.actions';
import { Modal, Form, Input, Button, message, notification } from 'antd';
import React from 'react'


interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v:boolean) => void;
}

const UserCreate = (props: IProps) => {
    const {isCreateModalOpen, setIsCreateModalOpen} = props;
    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields()
        setIsCreateModalOpen(false)
    }

    const onFinish = async (values: any) => {
        const res = await handleCreateUserAction(values);
        if(res?.data){
            handleCloseModal()
            message.success("Tạo thành công")
        }else{
            notification.error({
                message: "Đã xảy ra lỗi",
                description: res?.message
            })
        }
    }
  return (
    <Modal
    title="Tạo Người Dùng"
    open={isCreateModalOpen}
    onCancel={handleCloseModal}
    footer={null} // Chúng ta sẽ sử dụng các nút trong form thay vì phần footer mặc định
>
    <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
    >
        <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item>
                <Button
                    onClick={handleCloseModal}
                >
                    Hủy
                </Button>
                <Button   style={{ marginLeft: '8px' }} type="primary" htmlType="submit">
                    Tạo
                </Button>
        </Form.Item>
    </Form>
</Modal>
  )
}

export default UserCreate