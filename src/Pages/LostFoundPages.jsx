import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LostFoundPages = () => {
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((res) => {
        setAllItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Lost & Found Items
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>

                <p className="text-gray-600 text-sm">
                  {item.description?.slice(0, 80)}...
                </p>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{item.location}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <p
                  className={`inline-block px-2 py-1 text-xs rounded font-medium mt-1 ${
                    item.status === "recovered"
                      ? "bg-gray-200 text-gray-700"
                      : item.postType === "Lost"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status === "recovered" ? "Recovered" : item.postType}
                </p>
              </div>

              <div className="pt-4 text-right">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                  onClick={() => navigate(`/itemdetail/${item._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFoundPages;
