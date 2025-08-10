import React from 'react';
import { createBrowserRouter } from 'react-router'; // ✅ dom না, শুধু react-router
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

const Router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement:<ErrorPages/>,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      {
        path: 'addlost',
        element: <PrivetsRoutes><AddLost /></PrivetsRoutes>
      },
      {
        path: 'allrecoverd',
        element: <PrivetsRoutes><AllRecovered /></PrivetsRoutes>
      },
      {
        path: 'manage',
        element: <PrivetsRoutes><ManageMyItem /></PrivetsRoutes>
      },
      {
        path: 'details/:id',
        element: <PrivetsRoutes><ItemDetails /></PrivetsRoutes>
      },
      {
        path: '/updateItems/:id',
        element: <PrivetsRoutes><UpdateItem /></PrivetsRoutes>,
        loader: ({ params }) =>
          fetch(`https://lost-and-found-hazel.vercel.app/items/${params.id}`)
      },
      {
        path: 'lostpages',
        element: <PrivetsRoutes><LostFoundPages /></PrivetsRoutes>
      },
      { path: '/itemdetail/:id', Component: ItemDetails },
      { path: 'register', Component: Register },
      { path: 'sign', Component: SignIn },
    ]
  },
]);

export default Router;
