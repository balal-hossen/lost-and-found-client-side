import { Link, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
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

      {/* Right side (Navbar + Main Content) */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* ✅ Navbar */}
        <nav className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-xl font-semibold">Dashboard Navbar</h1>
          <div className="flex items-center gap-3">
            <Link to="/">
              <button className="btn btn-sm">Home</button>
            </Link>
            <button className="btn btn-sm btn-error">Logout</button>
          </div>
        </nav>

        {/* ✅ Main content area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
