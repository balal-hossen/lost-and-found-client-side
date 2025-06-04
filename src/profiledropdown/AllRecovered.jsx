import { useEffect, useState } from "react";
import axios from "axios";

const AllRecoverd= () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/items") // নিজের server URL দিও
      .then(res => {
        setAllItems(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">All Lost & Found Items</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {allItems.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
            
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description.slice(0, 80)}...</p>
              <p className="text-gray-500 text-sm"> {item.location}</p>
                             <p className="text-gray-500 text-sm"> {item.date}</p>

              <p className={`inline-block px-2 py-1 text-xs rounded ${
                item.postType === "Lost" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}>
                {item.postType}
              </p>

              <div className="pt-3">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  onClick={() => window.location.href = `/items/${item._id}`}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecoverd;
