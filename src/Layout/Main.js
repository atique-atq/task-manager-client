import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../pages/Shared/Footer';

const Main = () => {
    return (
        <div className='dark:bg-slate-800 ring-1 ring-slate-900/5 shadow-xl'>
            <Header></Header>
            <Outlet className='dark:bg-slate-800 px-6 py-8 ring-1 ring-slate-900/5 shadow-xl'></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;