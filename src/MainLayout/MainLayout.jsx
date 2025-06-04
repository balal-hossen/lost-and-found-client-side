import React from 'react';
import Navbar from '../NavLink/Navbar';
import { Outlet } from 'react-router';
import Footer from '../NavLink/Footer';


const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
           <Footer/>
        </div>
    );
};

export default MainLayout;