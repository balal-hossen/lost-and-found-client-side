import React, { useEffect, useState } from "react";

const StatCard = ({ title, value, suffix, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const increment = end / (duration * 60); // 60fps animation
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(start);
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [value, duration]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-3xl font-bold text-indigo-600">
        {value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
        {suffix}
      </h3>
      <p className="mt-2 text-gray-600 font-medium">{title}</p>
    </div>
  );
};

const SuccessStory = () => {
  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Success Story
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Users" value={5000} suffix="+" duration={1} />
          <StatCard title="Items Recovered" value={8.9} suffix="/5" duration={1} />
          <StatCard title="User Rating" value={1395} suffix="%" duration={1} />
          <StatCard title="Success Rate" value={5395} suffix="%" duration={1} />
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
