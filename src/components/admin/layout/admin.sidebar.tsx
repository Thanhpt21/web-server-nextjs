'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppleOutlined,
    AppstoreOutlined,
    CalculatorOutlined,
    CommentOutlined,
    GiftOutlined,
    HomeOutlined,
    MailOutlined,
    MonitorOutlined,
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
                    key: "blog",
                    label: <Link href={"/admin/blog"}>Tin tức</Link>,
                    icon: <MonitorOutlined />,
                },
                {
                    key: "brand",
                    label: <Link href={"/admin/brand"}>Thương hiệu</Link>,
                    icon: <AppleOutlined />,
                },
                {
                    key: "enquiry",
                    label: <Link href={"/admin/enquiry"}>Liên hệ</Link>,
                    icon: <CommentOutlined />,
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
                    key: 'marketing',
                    label: 'Thương mại',
                    icon: <CalculatorOutlined />,
                    children: [
                        { key: 'coupon', label: <Link href={"/admin/coupon"}>Mã giảm giá</Link> },
                        { key: 'ship', label: <Link href={"/admin/ship"}>Phí ship</Link> },
                    ],
                },
                {
                    key: 'properties',
                    label: 'Thuộc tính',
                    icon: <AppstoreOutlined />,
                    children: [
                        { key: 'color', label: <Link href={"/admin/color"}>Màu sắc</Link> },
                        { key: 'size', label: <Link href={"/admin/size"}>Kích thước</Link> },
                        // {
                        //     key: 'sub3',
                        //     label: 'Submenu',
                        //     children: [
                        //         { key: '7', label: 'Option 7' },
                        //         { key: '8', label: 'Option 8' },
                        //     ],
                        // },
                    ],
                },
                {
                    type: 'divider',
                },
                {
                    key: 'setting',
                    label: 'Cài đặt',
                    icon: <SettingOutlined />,
                    children: [
                        { key: 'config', label: <Link href={"/admin/config"}>Cấu hình</Link> },
                        { key: 'store', label: 'Chi nhánh' },
                        { key: 'Menu', label: 'Menu' },
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