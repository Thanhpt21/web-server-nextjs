'use client'


import Footer from '@/components/client/Footer';
import Header from '@/components/client/header/Header';
import { fetchConfig } from '@/redux/features/configSlice';
import { fetchUser } from '@/redux/features/userSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Home = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const session = useSession();
    const token = session?.data?.user.access_token ?? '';
    const dispatch: AppDispatch = useDispatch();
    const config = useSelector((state: RootState) => state.config.config);
    const status = useSelector((state: RootState) => state.config.status);
    const user = useSelector((state: RootState) => state.user.user);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchConfig());
        
      }
    
    }, [dispatch, token]);
  
  return (
    <>
        <Header config={config}/>
            <main>
            {children}
            </main>
        <Footer />
    </>
  );
};

export default Home;