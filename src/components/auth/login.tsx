'use client'
import { signIn } from "next-auth/react"
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import ModalReactive from "./modal.reactive";
import { useState } from "react";
import ModalChangePassword from "./modal.change.password";
import { authenticate } from "@/utils/actions/user.actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const router = useRouter()
    const onFinish = async (values: any) => {
        const {username, password} = values;
        const res = await authenticate(username, password)
        if(res?.error){
            if(res?.code === 2){
                setUserEmail(username)
                setIsModalOpen(true)
                return;
            }
            notification.error({
                message: "Đăng nhập không thành công",
                description: res?.error
            })
           
        }else{
            router.push("/admin")
        }

    };

    return (
        <>
          <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item
                        >
                          
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Button type="link" onClick={() => setChangePassword(true)}>
                                Quên mật khẩu ?
                            </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    <Link href={"/home"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
        <ModalReactive 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
        />
        <ModalChangePassword 
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
        />
        </>
      
    )
}

export default Login;