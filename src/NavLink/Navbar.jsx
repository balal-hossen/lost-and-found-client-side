import React, { useContext, useState } from 'react';
import { Authcontex } from "../AuthContext";
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const { user, signout } = useContext(Authcontex);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    signout()
      .then(() => {
        console.log('Sign out successful');
        setIsModalOpen(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const Links = (
    <div className="gap-6 lg:flex">
      <NavLink to="/" className={({ isActive }) =>
        isActive ? "text-blue-600 font-semibold underline block py-2"
          : "text-gray-700 font-bold block py-2"}>
        Home
      </NavLink>

      {user && (
        <>
          <NavLink to="/lostpages" className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold underline block py-2"
              : "text-gray-700 font-bold block py-2"}>
            Lost & Found Items Pages 
          </NavLink>
          
        
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
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
          <Link to="/" className="btn btn-ghost text-xl">Lost and Found</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>



        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              {/*  Profile Image with Tooltip */}
              {user.photoURL && (
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName || "User"}
                >
                  <img
                    src={user.photoURL}
                    alt="User"
                    onClick={() => setIsModalOpen(true)}
                    className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                  />
                </div>
              )}

              {/* Sign Out Button */}
              <button onClick={handleSignOut} className="btn btn-sm btn-error">
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <Link to="/register"><button className="btn btn-sm">Register</button></Link>
              <Link to="/sign"><button className="btn btn-sm">Sign In</button></Link>
            </div>
          )}
        </div>
      </div>

      {/*  Right Side Sidebar Modal */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
          <div className='space-y-3.5'>
              <Link to='/addlost'>
            <button className='btn'>Add Lost& Found Item  </button>
            </Link>
            <Link to='/allrecoverd'>
            <button className='btn mt-2'>All Recovered Iteme  </button>
            </Link>
            <Link to='/manage'>
            <button className='btn mt-2'>Manage My Items   </button>
            </Link>
          </div>

            <button
              onClick={handleSignOut}
              className="btn mt-2 btn-error w-full">
              Logout
            </button>

          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
