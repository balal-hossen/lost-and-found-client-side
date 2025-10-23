// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import Speech from "speak-tts";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speech, setSpeech] = useState(null);

  const { user, signout } = useAuth();
  const isAdmin = user?.email === "admin@lostfound.com";

  // Theme setup
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Speech init
  useEffect(() => {
    const speechInstance = new Speech();
    if (speechInstance.hasBrowserSupport()) {
      speechInstance
        .init({
          volume: 1,
          lang: "en-US",
          rate: 1,
          pitch: 1,
          voice: "Google US English",
          splitSentences: true,
        })
        .then(() => setSpeech(speechInstance))
        .catch((e) => console.error("Speech init failed:", e));
    }
  }, []);

  const speakText = (text) => {
    if (speech) {
      speech.speak({ text }).catch((e) => console.error("Speech error:", e));
    }
  };

  const handleSignOut = () => {
    signout().then(() => setIsModalOpen(false)).catch((err) => console.log(err));
  };

  // Link styles
  const linkClass = (isActive) => {
    if (theme === "dark") {
      return isActive
        ? "text-yellow-300 font-bold underline block py-2"
        : "text-white font-bold block py-2";
    } else {
      return isActive
        ? "text-blue-700 font-bold underline block py-2"
        : "text-black font-bold block py-2";
    }
  };

  // Links
  const Links = (
    <div className="gap-6 lg:flex flex-col lg:flex-row">
      <NavLink to="/" className={({ isActive }) => linkClass(isActive)} onClick={() => speakText("Home")}>
        <span className="lg:text-xl"> Home</span>
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => linkClass(isActive)} onClick={() => speakText("About")}>
        <span className="lg:text-xl"> About</span>
      </NavLink>
      {user && (
        <NavLink
          to="/lostpages"
          className={({ isActive }) => linkClass(isActive)}
          onClick={() => speakText("Lost and Found Items")}
        >
          <span className="lg:text-xl">Lost & Found Items</span>
        </NavLink>
      )}
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <div
        className={`navbar sticky top-0  z-50 w-full transition-colors duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-gray-900 text-white shadow-md py-2"
              : "bg-white text-black shadow-md py-2"
            : theme === "dark"
            ? "bg-transparent text-white py-2"
            : "bg-transparent text-black py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 lg:px-10 w-full flex justify-between items-center">
          <div className="navbar-start">
            {/* Mobile dropdown */}
            <div className="dropdown w-10">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-52 h-80 ${
                  theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
                } shadow-md`}
              >
                {Links}
                <button
                  onClick={toggleTheme}
                  className=" rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-4"
                >
                  {theme === "dark" ? "🌞" : "🌙"}
                </button>
                

                  <div className="navbar-end flex items-center gap-4">
            {user ? (
              <>
                {user.photoURL && (
                  <div className="relative -mt-8  group gap-40 lg:block md:block">
                    <img
                      src={user.photoURL}
                      alt="User"
                      onClick={() => { setIsModalOpen(true); speakText("User profile"); }}
                      className="w-10 h-10 ml-26 rounded-full border border-gray-300 cursor-pointer"
                    />
                  </div>
                )}
                
              </>
            ) : (
              <div className="space-x-2 flex">
                <Link to="/register">
                  <button className="btn btn-sm lg:text-md  bg-green-500 hover:bg-green-400" onClick={() => speakText("Register")}>Register</button>
                </Link>
                <Link to="/sign">
                  <button className="btn btn-sm w-20 lg:w-full bg-green-500 hover:bg-green-400 lg:text-md" onClick={() => speakText("Sign In")}>Sign In</button>
                </Link>
              </div>
            )}
          </div>
              </ul>
            </div>

            <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
              <span className="hidden md:block lg:block"><Logo /></span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {Links}
              <button
                onClick={toggleTheme}
                className=" rounded-full w-8 h-8 mt-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-4"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </button>
            </ul>
          </div>

          <div className="navbar-end flex items-center gap-4">
            {user ? (
              <>
                {user.photoURL && (
                  <div className="relative group hidden lg:block md:block">
                    <img
                      src={user.photoURL}
                      alt="User"
                      onClick={() => { setIsModalOpen(true); speakText("User profile"); }}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                    />
                  </div>
                )}
                <button onClick={handleSignOut} className="btn btn-sm btn-error">Sign Out</button>
              </>
            ) : (
              <div className="space-x-2 flex">
                <Link to="/register">
                  <button className="btn btn-sm lg:text-md  bg-green-500 hover:bg-green-400" onClick={() => speakText("Register")}>Register</button>
                </Link>
                <Link to="/sign">
                  <button className="btn btn-sm w-20 lg:w-full bg-green-500 hover:bg-green-400 lg:text-md" onClick={() => speakText("Sign In")}>Sign In</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Modal */}
      <div
        className={`fixed top-0 right-0 h-full shadow-lg p-6 z-50 overflow-y-auto transform transition-transform duration-300 ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        } w-full max-w-xs lg:w-72 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <button
          onClick={() => { setIsModalOpen(false); speakText("Close sidebar"); }}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white"
        >
          &times;
        </button>

       {user && (
  <>
    <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h2 className="text-xl font-bold text-center">{user.displayName || "No Name"}</h2>
    <p className="text-center text-sm mb-6">{user.email}</p>

    <div className="space-y-3.5">
      <Link to={user.email === "admin@lostfound.com" ? '/admin' : '/layout'}>
        <button
          className="btn w-full mt-2"
          onClick={() => { setIsModalOpen(false); speakText('Go to Dashboard'); }}
        >
          {user.email === "admin@lostfound.com" ? "Admin Dashboard" : "User Dashboard"}
        </button>
      </Link>
    </div>

    <button
      onClick={() => { handleSignOut(); speakText("Logging out"); }}
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
