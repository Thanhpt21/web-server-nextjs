'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Phần 1: Giới thiệu */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Giới thiệu</h3>
                        <p className="text-sm">
                            Chúng tôi cung cấp các sản phẩm và dịch vụ tốt nhất để phục vụ bạn. Tận hưởng chất lượng dịch vụ hàng đầu từ chúng tôi.
                        </p>
                    </div>

                    {/* Phần 2: Liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <ul className="text-sm">
                            <li>Email: support@example.com</li>
                            <li>Điện thoại: +123 456 789</li>
                            <li>Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
                        </ul>
                    </div>

                    {/* Phần 3: Liên kết nhanh */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="text-sm">
                            <li><a href="/" className="hover:underline">Trang chủ</a></li>
                            <li><a href="/products" className="hover:underline">Sản phẩm</a></li>
                            <li><a href="/news" className="hover:underline">Tin tức</a></li>
                            <li><a href="/contact" className="hover:underline">Liên hệ</a></li>
                            <li><a href="/about" className="hover:underline">Giới thiệu</a></li>
                        </ul>
                    </div>

                    {/* Phần 4: Mạng xã hội */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Mạng xã hội</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Responsive layout */}
                <div className="mt-8 md:hidden">
                    <div className="flex flex-col space-y-8">
                        {/* Phần 1: Giới thiệu */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Giới thiệu</h3>
                            <p className="text-sm">
                                Chúng tôi cung cấp các sản phẩm và dịch vụ tốt nhất để phục vụ bạn. Tận hưởng chất lượng dịch vụ hàng đầu từ chúng tôi.
                            </p>
                        </div>

                        {/* Phần 2: Liên hệ */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                            <ul className="text-sm">
                                <li>Email: support@example.com</li>
                                <li>Điện thoại: +123 456 789</li>
                                <li>Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
                            </ul>
                        </div>

                        {/* Phần 3: Liên kết nhanh */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                            <ul className="text-sm">
                                <li><a href="/" className="hover:underline">Trang chủ</a></li>
                                <li><a href="/products" className="hover:underline">Sản phẩm</a></li>
                                <li><a href="/news" className="hover:underline">Tin tức</a></li>
                                <li><a href="/contact" className="hover:underline">Liên hệ</a></li>
                                <li><a href="/about" className="hover:underline">Giới thiệu</a></li>
                            </ul>
                        </div>

                        {/* Phần 4: Mạng xã hội */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Mạng xã hội</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={24} /></a>
                                <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
                                <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
                                <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn size={24} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
