'use client'

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, notification, Steps } from "antd"
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";

const ModalReactive = (props: any) => {
    const  {isModalOpen, setIsModalOpen, userEmail} = props;
    
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState("");
    const [form] = Form.useForm();
    const hasMounted = useHasMounted()
    

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onFinishStep0 = async (values: any) => {
        const {email} = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            body: {
                email
            }
        })
        if(res?.data){
            setUserId(res?.data?._id)
            setCurrent(1)
        }else{
            notification.error({
                message: "Đã xảy ra lỗi",
                description: res?.message
            })
        }
    }

    const onFinishStep1 = async (values: any) => {
        const {code} = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            body: {
                code, _id: userId
            }
        })
        if(res?.data){
            setCurrent(2)
        }else{
            notification.error({
                message: "Đã xảy ra lỗi",
                description: res?.message
            })
        }
    }

    useEffect(() => {
        if(userEmail){
            form.setFieldValue("email", userEmail)
        }
    },[userEmail])
    
    if(!hasMounted) return <></>
    return (
        <>
          <Modal 
          maskClosable={false} 
          title="Kích hoạt tài khoản" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
          footer={null}
          >
      <Steps
            current={current}
            items={[
            {
                title: 'Login',
            
                icon: <UserOutlined />,
            },
            {
                title: 'Verification',
                
                icon: <SolutionOutlined />,
            },
            
            {
                title: 'Done',
                
                icon: <SmileOutlined />,
            },
            ]}
        />
        {
            current === 0 && <>
                        <div style={{margin: "20px 0"}}><p>Tài khoản của bạn chưa được kích hoạt</p>
            </div>
                    <Form
                    name="step0"
                    onFinish={onFinishStep0}
                    autoComplete="off"
                    layout='vertical'
                    form={form}
                >
                    <Form.Item
                        label=""
                        name="email"
                    
                    >
                        <Input disabled value={userEmail} />
                    </Form.Item>




                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            Resend
                        </Button>
                    </Form.Item>
                </Form>
            </>

        }
        {
            current === 1 && <>
             <div style={{margin: "20px 0"}}><p>Nhập mã xác nhận</p>
            </div>
                    <Form
                    name="step1"
                    onFinish={onFinishStep1}
                    autoComplete="off"
                    layout='vertical'
                    form={form}
                >
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Code!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            Gửi đi
                        </Button>
                    </Form.Item>
                </Form>
            </>
        }
         {
            current === 2 && <>
             <div style={{margin: "20px 0"}}><p>Tài khoản kích hoạt thành công</p>
            </div>
                
            </>
        }
      </Modal>
        </>
    )

}

export default ModalReactive