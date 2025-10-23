import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import Home from '../MainLayout/Home';
import SignIn from '../ScoileLink/SignIn';
import Register from '../ScoileLink/Register';
import ErrorPages from '../ScoileLink/ErrorPages';
import About from '../Pages/About';
import ItemDetails from '../Pages/ItemDetails';
import LostFoundPages from '../Pages/LostFoundPages';
import UpdateItem from '../profiledropdown/UpdateItem';

// User Dashboard
import Layout from '../Userdashboard/Layout';
import Dashboard from '../Userdashboard/Dashboard';
import AddLost from '../profiledropdown/AddLost';
import AllRecovered from '../profiledropdown/AllRecovered';
import ManageMyItem from '../profiledropdown/ManageMyItem';

// Admin Dashboard
import AdminLayout from '../admindashboard/AdminLayout';
import AdminProtect from '../admindashboard/AdminProtect';

// Protected wrapper
import PrivetsRoutes from '../PrivetsRoutes';
//import ManageUser from '../admindashboard/ManageUser';
import ManageItem from '../admindashboard/ManageItem';
import Feedback from '../admindashboard/Feedback';
import AdminOverview from '../admindashboard/AdminOverview';


// Admin placeholder pages
//const AdminOverview = () => <h1 className="text-2xl font-bold">Admin Overviewdfgdf</h1>;
//const ManageUsers = () => <h1 className="text-2xl font-bold">Manage Users</h1>;
//const ManageItems = () => <h1 className="text-2xl font-bold">Manage Items</h1>;

const Router = createBrowserRouter([
  // Public & Main Routes
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPages />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'itemdetail/:id',
        element: <PrivetsRoutes><ItemDetails /></PrivetsRoutes>
      },
      {
        path: 'updateItems/:id',
        element: <PrivetsRoutes><UpdateItem /></PrivetsRoutes>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/items/${params.id}`, {
            credentials: "include"
          });
          return res.json();
        }
      },
      {
        path: 'lostpages',
        element: <PrivetsRoutes><LostFoundPages /></PrivetsRoutes>
      },
      { path: 'register', element: <Register /> },
      { path: 'sign', element: <SignIn /> },
    ]
  },

  // User Dashboard Routes
  {
    path: '/layout',
    element: <PrivetsRoutes><Layout /></PrivetsRoutes>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'addlost', element: <AddLost /> },
      { path: 'allrecoverd', element: <AllRecovered /> },
      { path: 'manage', element: <ManageMyItem /> },
     
    ]
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminProtect><AdminLayout /></AdminProtect>,
    children: [
      { index: true, element: <AdminOverview/> },
     // { path: 'manage-users', element: <ManageUser />},
      { path: 'manage-items', element: <ManageItem /> },
       {path: 'feedback', element: <Feedback/>}
    ]
  }
]);

export default Router;
