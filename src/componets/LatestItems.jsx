import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router";

const LatestItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted.slice(0, 6));
      });
  }, []);

  return (
    <section className="px-4 md:px-8 ">
     

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-md"
            whileHover={{ scale: 1.03 }}
          >
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description.slice(0, 60)}...</p>
            <Link to={`/item/${item.id}`}>
              <button className="mt-2 btn btn-sm bg-blue-600 text-white">View Details</button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/lostpages">
          <button className="btn bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            See All
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestItems;
