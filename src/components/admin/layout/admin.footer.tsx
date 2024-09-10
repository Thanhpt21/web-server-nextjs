'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer className='text-center'>
                {new Date().getFullYear()} Tạo bởi AzStore
            </Footer>
        </>
    )
}

export default AdminFooter;