import React, { useContext, useState, useEffect } from 'react';
import { Authcontex } from "../AuthContext";
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import Speech from 'speak-tts';

const Navbar = () => {
  const { user, signout } = useContext(Authcontex);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speech, setSpeech] = useState(null);

  // speak-tts init
  useEffect(() => {
    const speechInstance = new Speech();
    if(speechInstance.hasBrowserSupport()) {
      speechInstance.init({
        volume: 1,
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        voice:'Google US English',
        splitSentences: true,
      }).then(() => {
        setSpeech(speechInstance);
      }).catch(e => {
        console.error("Speech initialization failed:", e);
      });
    } else {
      console.warn("Speech synthesis not supported");
    }
  }, []);

  const handleSignOut = () => {
    signout()
      .then(() => {
        setIsModalOpen(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // function to speak text
  const speakText = (text) => {
    if(speech) {
      speech.speak({
        text: text,
      }).catch(e => {
        console.error("Speech error:", e);
      });
    }
  };

  const Links = (
    <div className="gap-6 lg:flex text-white flex flex-col lg:flex-row">
      <NavLink 
        to="/" 
        className={({ isActive }) =>
          isActive ? "text-yellow-300 font-bold underline block py-2"
          : "text-white font-bold block py-2"
        }
        onClick={() => speakText('Home')}
      >
        <span className='lg:text-xl'> Home</span>
      </NavLink>
     
      {user && (
        <>
          <NavLink 
            to="/lostpages" 
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-bold underline block py-2"
              : "text-white font-bold block py-2"
            }
            onClick={() => speakText('Lost and Found Items')}
          >
            <span className='lg:text-xl'>Lost & Found Items</span>
          </NavLink>

          {/* Small device profile + tooltip */}
          <div className="relative group flex items-center gap-2 lg:hidden ml-6">
            {user.photoURL && (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  onClick={() => {
                    setIsModalOpen(true);
                    speakText('User profile');
                  }}
                  className="w-8 h-8 ml-12 rounded-full border border-gray-300 md:hidden cursor-pointer"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                  {user.displayName || "User"}
                </div>
              </>
            )}
          </div>
        </>
      )}
       <NavLink 
         to="/about" 
         className={({ isActive }) =>
           isActive ? "text-yellow-300 font-bold underline block py-2"
           : "text-white font-bold block py-2"
         }
         onClick={() => speakText('About')}
       >
         <span className='lg:text-xl '> About</span>
       </NavLink>

    </div>
  );

  return (
    <>
      <div className="navbar sticky top-0 z-50 w-full bg-indigo-700 shadow-md">
        <div className="max-w-7xl mx-auto px-2 lg:px-10 w-full flex justify-between items-center">
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

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-indigo-700 rounded-box w-52">
                {Links}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
              <span className='hidden md:block lg:block'>
                <Logo />
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>

          <div className="navbar-end flex items-center gap-4">
            {user ? (
              <>
                {/* Large device profile */}
                {user.photoURL && (
                  <div className="relative group hidden lg:block md:block">
                    <img
                      src={user.photoURL}
                      alt="User"
                      onClick={() => {
                        setIsModalOpen(true);
                        speakText('User profile');
                      }}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap">
                      {user.displayName || "User"}
                    </div>
                  </div>
                )}

                <button onClick={handleSignOut} className="btn btn-sm btn-error">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-x-2 flex">
                <Link to="/register"><button className="btn btn-sm  lg:text-md text-white" onClick={() => speakText('Register')}>Register</button></Link>
                <Link to="/sign"><button className="btn btn-sm w-20 lg:w-full lg:text-md text-white" onClick={() => speakText('Sign In')}>Sign In</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Modal */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto transform transition-transform duration-300
          ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}
          w-full max-w-xs lg:w-72`}
      >
        <button
          onClick={() => {
            setIsModalOpen(false);
            speakText('Close sidebar');
          }}
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
                <button className='btn w-full' onClick={() => speakText('Add Lost and Found Item')}>Add Lost & Found Item</button>
              </Link>
              <Link to='/allrecoverd'>
                <button className='btn w-full mt-2' onClick={() => speakText('All Recovered Items')}>All Recovered Items</button>
              </Link>
              <Link to='/manage'>
                <button className='btn w-full mt-2' onClick={() => speakText('Manage My Items')}>Manage My Items</button>
              </Link>
            </div>

            <button
              onClick={() => {
                handleSignOut();
                speakText('Logging out');
              }}
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
