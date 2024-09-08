'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/app/globals.css';
import NextAuthWrapper from "@/library/next.auth.wrapper";
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store from "@/redux/store";
import Home from "./page";
import { App } from "antd";
import { auth } from "@/auth";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Azstore",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
          <AntdRegistry>
            <NextAuthWrapper>
              <Home children={children} />
            </NextAuthWrapper>
          </AntdRegistry>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
