import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // ✅ Auth context import

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark"); // ✅ Theme state
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  // ✅ Apply theme on document root
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 inset-y-0 left-0 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        <Link to="/">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        </Link>
        <nav className="space-y-3">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/manage-items"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Lost And Found
          </NavLink>
          <NavLink
            to="/admin/feedback"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            All Recovery
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between w-full items-center shadow p-4">
          <div className="flex items-center gap-3">
            {/* Hamburger for small screens */}
            <button
              className="lg:hidden btn btn-ghost p-2"
              onClick={toggleSidebar}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            <Link to="/">
              <button className="btn btn-sm">Home</button>
            </Link>

            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-error"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
