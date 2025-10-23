import React from "react";
import { Link, NavLink, Outlet } from "react-router";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
       <Link to='/'>
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
            Overview
          </NavLink>

          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            Manage Users
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
