import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../MainLayout/Home';
import SignIn from '../ScoileLink/SignIn';
import PrivetsRoutes from '../PrivetsRoutes';
import AddLost from '../profiledropdown/AddLost';
import AllRecovered from '../profiledropdown/AllRecovered';
import ManageMyItem from '../profiledropdown/ManageMyItem';
import LostFoundPages from '../Pages/LostFoundPages';
import ItemDetails from '../Pages/ItemDetails';
import UpdateItem from '../profiledropdown/UpdateItem';
import Register from '../ScoileLink/Register';
import About from '../Pages/About';
import ErrorPages from '../ScoileLink/ErrorPages';
import Layout from '../Userdashboard/Layout';
import Dashboard from '../Userdashboard/Dashboard';


const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPages />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'itemdetail/:id', element: <PrivetsRoutes><ItemDetails /></PrivetsRoutes> },
      {
        path: 'updateItems/:id',
        element: <PrivetsRoutes><UpdateItem /></PrivetsRoutes>,
        loader: ({ params }) =>
          fetch(`https://lost-and-found-hazel.vercel.app/items/${params.id}`)
      },
      { path: 'lostpages', element: <PrivetsRoutes><LostFoundPages /></PrivetsRoutes> },
      { path: 'register', element: <Register /> },
      { path: 'sign', element: <SignIn /> },

     
    ]
  },

  {
    path: '/layout',
    element: <PrivetsRoutes><Layout /></PrivetsRoutes>,
    children: [
      { index: true, element: <Dashboard/> },
      { path: 'addlost', element: <PrivetsRoutes><AddLost /></PrivetsRoutes> },
      { path: 'allrecoverd', element: <PrivetsRoutes><AllRecovered /></PrivetsRoutes> },
      { path: 'manage', element: <PrivetsRoutes><ManageMyItem /></PrivetsRoutes> },
         
    ]
  }
]);

export default Router;
