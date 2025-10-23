import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // ✅ Import Auth context

export default function UserLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { signout, user } = useAuth(); // ✅ Get user + signout
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ✅ Handle logout same as Navbar
  const handleLogout = async () => {
    try {
      await signout();
      setSidebarOpen(false); // close sidebar if open
      navigate("/"); // go back home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-105 inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform 
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        <Link to="/">
          <h2 className="text-xl text-center font-semibold mb-4">
            User Dashboard
          </h2>
        </Link>
        <nav className="space-y-2">
          <Link to="/layout/addlost">
            <button className="btn w-full">Add Lost & Found Item</button>
          </Link>
          <Link to="/layout/allrecoverd">
            <button className="btn w-full mt-2">All Recovered Items</button>
          </Link>
          <Link to="/layout/manage">
            <button className="btn w-full mt-2">Manage My Items</button>
          </Link>

        
       
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Right side */}
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
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>

            <Link to="/">
              <button className="btn btn-sm">Home</button>
            </Link>

            {/* ✅ Functional Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
