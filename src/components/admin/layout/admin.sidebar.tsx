'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    HomeOutlined,
    MailOutlined,
    ProductOutlined,
    SettingOutlined,
    SkinOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from 'antd';
import Link from 'next/link';
import './admin.sidebar.scss'

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: <div className="centered-menu-title">AzStore</div>,
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/admin"}>Thống kê</Link>,
                    icon: <HomeOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/admin/user"}>Tài khoản</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: "product",
                    label: <Link href={"/admin/product"}>Sản phẩm</Link>,
                    icon: <SkinOutlined />,
                },
                {
                    key: 'cate',
                    label: 'Danh mục',
                    icon: <ProductOutlined />,
                    children: [
                        { key: 'category', label: <Link href={"/admin/category"}>Danh mục sản phẩm</Link> },
                        { key: 'blog-category', label: <Link href={"/admin/blog-category"}>Danh mục tin tức</Link> },
                      
                    ],
                },
                {
                    key: 'properties',
                    label: 'Thuộc tính',
                    icon: <AppstoreOutlined />,
                    children: [
                        { key: 'color', label: 'Màu sắc' },
                        { key: 'size', label: 'Kích thước' },
                        {
                            key: 'sub3',
                            label: 'Submenu',
                            children: [
                                { key: '7', label: 'Option 7' },
                                { key: '8', label: 'Option 8' },
                            ],
                        },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    key: 'sub4',
                    label: 'Navigation Three',
                    icon: <SettingOutlined />,
                    children: [
                        { key: '9', label: 'Option 9' },
                        { key: '10', label: 'Option 10' },
                        { key: '11', label: 'Option 11' },
                        { key: '12', label: 'Option 12' },
                    ],
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;