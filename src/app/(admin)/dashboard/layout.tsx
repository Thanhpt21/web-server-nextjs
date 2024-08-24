'use client'
import AdminContent from '@/components/admin/admin.content';
import AdminFooter from '@/components/admin/admin.footer';
import AdminSidebar from '@/components/admin/admin.sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react'

const AdminLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [collapsed, setCollapsed] = useState(false);
 
  return (
    <Layout>
    <AdminSidebar collapsed={collapsed} />
    <Layout>
    <Header style={{ padding: 0 }}>
        <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
            fontSize: '16px',
            width: 64,
            height: 64,
        }}
        />
    </Header>
    <AdminContent>{children}</AdminContent>
    <AdminFooter />
    </Layout>
</Layout>
  )
}

export default AdminLayout