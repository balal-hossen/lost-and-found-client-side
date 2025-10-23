import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminOverview = () => {
  // Dummy Stats
  const stats = {
    totalUsers: 120,
    totalItems: 350,
    recoveredItems: 180,
    pendingItems: 170,
    lostItems: 200,
    foundItems: 150,
  };

  const pieData = [
    { name: "Lost Items", value: stats.lostItems },
    { name: "Found Items", value: stats.foundItems },
  ];

  const barData = [
    { name: "Recovered", count: stats.recoveredItems },
    { name: "Pending", count: stats.pendingItems },
  ];

  const COLORS = ["#FF8042", "#0088FE"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg">Total Items</h2>
          <p className="text-2xl">{stats.totalItems}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg">Recovered Items</h2>
          <p className="text-2xl">{stats.recoveredItems}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="font-bold text-lg">Pending Items</h2>
          <p className="text-2xl">{stats.pendingItems}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Lost vs Found</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Recovered vs Pending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
