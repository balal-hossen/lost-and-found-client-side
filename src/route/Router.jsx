import React from 'react';
import {
  createBrowserRouter,
  
} from "react-router";
import MainLayout from '../MainLayout/MainLayout';
import Home from '../MainLayout/Home';
import Register from '../ScoileLink/Register';
import SignIn from '../ScoileLink/SignIn';
import ErrorPages from '../ScoileLink/ErrorPages';
import PrivetsRoutes from '../PrivetsRoutes';
import AddLost from '../profiledropdown/AddLost';
import AllRecovered from '../profiledropdown/AllRecovered';
import ManageMyItem from '../profiledropdown/ManageMyItem';
import LostFoundPages from '../Pages/LostFoundPages';

const Router = createBrowserRouter([
  {
    path: '/',
   Component:MainLayout,
   errorElement:ErrorPages,
   children:[
    {
        index:true,
        Component:Home
    },
    {
path:'addlost',
element:<PrivetsRoutes><AddLost></AddLost></PrivetsRoutes>
    },
    {
path:'allrecoverd',
element:<PrivetsRoutes><AllRecovered/></PrivetsRoutes>
    },
    {
path:'manage',
element:<PrivetsRoutes><ManageMyItem/></PrivetsRoutes>
    },
    {
path:'lostpages',
element:<PrivetsRoutes><LostFoundPages/></PrivetsRoutes>
    },
    {
        path:'register',
        Component:Register
    },
    {
        path:'sign',
        Component:SignIn
    }
   ]
  },
  
]);
export default Router;