import React from 'react';
import Navbar from '../NavLink/Navbar';
import { Outlet } from 'react-router';
import Footer from '../NavLink/Footer';


const MainLayout = () => {
    return (
        <div className='bg-gray-200'>
            <Navbar/>
            <Outlet/>
           <Footer/>
        </div>
    );
};

export default MainLayout;