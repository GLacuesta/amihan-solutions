import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex flex-col w-full h-full text-blackLight bg-white">
        {pathname !== '/login' && (<Header />)}
        <div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;