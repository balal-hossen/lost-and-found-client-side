import React, { useContext, useState } from 'react';
import { Authcontex } from "../AuthContext";
import { Link, NavLink } from 'react-router';
//import logo from '../assets/image/download.png'
import Logo from './Logo';

const Navbar = () => {
  const { user, signout } = useContext(Authcontex);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    signout()
      .then(() => {
        setIsModalOpen(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const Links = (
  <div className="gap-2 lg:flex text-white flex flex-col lg:flex-row">
    <NavLink to="/" className={({ isActive }) =>
      isActive ? "text-blue-600 font-bold underline block py-2"
        : "text-gray-700 font-bold block py-2"}>
     <span className='lg:text-2xl'> Home</span>
    </NavLink>

    {user && (
      <>
        <NavLink to="/lostpages" className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold underline block py-2"
            : "text-gray-700 font-bold block py-2"}>
         <span className='lg:text-2xl'>Lost & Found Items Pages</span>
        </NavLink>

        <div className="flex items-center gap-2 lg:hidden  ml-6">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              onClick={() => setIsModalOpen(true)}
              className="w-8 h-8 ml-12 rounded-full border border-gray-300  md:hidden cursor-pointer"
            />
          )}
        
        </div>
      </>
    )}
  </div>
);


  return (
    <>
      <div className="navbar bg-base-100 shadow-sm top-0 z-50 sticky">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {Links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost  normal-case text-xl flex items-center gap-2">
          
           <span className='hidden md:block lg:block'>
             <Logo />
           </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              {user.photoURL && (
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName || "User"}
                >
                <div className='hidden lg:block md:block'>
                    <img
                    src={user.photoURL}
                    alt="User"
                    onClick={() => setIsModalOpen(true)}
                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  />
                </div>
                </div>
              )}

              <button onClick={handleSignOut} className="btn btn-sm btn-error">
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-x-2 flex">
              <Link to="/register"><button className="btn btn-sm lg:text-2xl">Register</button></Link>
              <Link to="/sign"><button className="btn btn-sm w-20 lg:w-full lg:text-2xl">Sign In</button></Link>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Right Side Sidebar Modal */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto transform transition-transform duration-300
          ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}
          w-full max-w-xs lg:w-72`}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
        >
          &times;
        </button>

        {user && (
          <>
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl text-black font-bold text-center">{user.displayName || "No Name"}</h2>
            <p className="text-center text-sm text-gray-600 mb-6">{user.email}</p>

            <div className="space-y-3.5">
              <Link to='/addlost'>
                <button className='btn w-full'>Add Lost & Found Item</button>
              </Link>
              <Link to='/allrecoverd'>
                <button className='btn w-full mt-2'>All Recovered Items</button>
              </Link>
              <Link to='/manage'>
                <button className='btn w-full mt-2'>Manage My Items</button>
              </Link>
            </div>

            <button
              onClick={handleSignOut}
              className="btn mt-4 btn-error w-full"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
