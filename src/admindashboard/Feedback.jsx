import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllRecovery = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===== fetch recovered items =====
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items", { withCredentials: true });
      // only recovered items
      const filteredItems = res.data.filter(item => item.status === "recovered");
      setItems(filteredItems);
    } catch (err) {
      console.error("Fetch items error:", err);
      Swal.fire("Error", "Could not fetch items", "error");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ===== Pagination logic =====
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Recovered Items</h1>
        <p>No recovered items found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Recovered Items</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentItems.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition-shadow">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                <p><strong>Post Type:</strong> {item.postType}</p>
                {item.recoveredLocation && (
                  <p><strong>Recovered Location:</strong> {item.recoveredLocation}</p>
                )}
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <img
                  src={item.userImage}
                  alt={item.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{item.userName}</span>
              </div>
              <div className="mt-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Pagination Controls ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllRecovery;
