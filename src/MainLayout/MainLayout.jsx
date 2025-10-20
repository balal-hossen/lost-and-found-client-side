import React from 'react';
import Navbar from '../NavLink/Navbar';
import { Outlet } from 'react-router';
import Footer from '../NavLink/Footer';


const MainLayout = () => {
    return (
        <div className=''>
            <Navbar/>
           <main className='' style={{minHeight:'calc(100vh - 130px)'}}>
             <Outlet/>
           </main>
           <Footer/>
        </div>
    );
};

export default MainLayout;