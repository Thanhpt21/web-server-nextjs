'use client';


import Link from "next/link";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import TopHeader from "./TopHeader";


interface IProps {
    config: any; 
}
  

const Header = ({config}: IProps) => {
    return (
        <header className="py-4">
            <TopHeader config={config} />
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    {/* Phần 1: Logo */}
                    <div className="flex justify-start">
                        <img src={config?.data?.data[0]?.logo} className="w-40" alt={config?.data?.data[0]?.name} />
                    </div>

                    {/* Phần 2: Menu */}
                    <nav className="hidden md:flex justify-center">
                        <ul className="flex space-x-4">
                            <li><Link href="/home">Trang chủ</Link></li>
                            <li><Link href="/product">Sản phẩm</Link></li>
                            <li><Link href="/news">Tin tức</Link></li>
                            <li><Link href="/contact">Liên hệ</Link></li>
                            <li><Link href="/about">Giới thiệu</Link></li>
                        </ul>
                    </nav>

                    {/* Phần 3: Icons */}
                    <div className="flex justify-end space-x-4">
                        <Link href={`/auth/login`}><FaUser className="text-xl cursor-pointer" /></Link>
                        <FaHeart className="text-xl cursor-pointer" />
                        <FaShoppingCart className="text-xl cursor-pointer" />
                    </div>
                </div>

                {/* Responsive Menu */}
                <nav className="md:hidden flex justify-center mt-4">
                    <ul className="flex flex-col space-y-2">
                        <li><Link href="/">Trang chủ</Link></li>
                        <li><Link href="/products">Sản phẩm</Link></li>
                        <li><Link href="/news">Tin tức</Link></li>
                        <li><Link href="/contact">Liên hệ</Link></li>
                        <li><Link href="/about">Giới thiệu</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
