'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer className='text-center'>
                Hỏi Dân IT ©{new Date().getFullYear()} Created by @hoidanit
            </Footer>
        </>
    )
}

export default AdminFooter;