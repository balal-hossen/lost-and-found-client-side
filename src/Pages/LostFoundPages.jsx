import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Authcontex } from "../AuthContext";
import { Helmet } from "react-helmet-async";

const LostFoundPages = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // default latest first
  const [loading, setLoading] = useState(true);

  // Pagination states
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { user } = useContext(Authcontex);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`)
      .then((res) => {
        setAllItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    let matched = allItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowerText) ||
        item.location?.toLowerCase().includes(lowerText)
    );

    matched.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setFilteredItems(matched);
    setCurrentPage(1); // reset page on filter or sort change
  }, [searchText, allItems, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-black min-h-screen">
        <span className="loading loading-spinner text-blue-500 loading-lg"></span>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <Helmet>
        <title>Lost & Found Items | WhereIsIt</title>
        <meta name="description" content="সব Lost & Found items দেখুন এবং খুঁজুন।" />
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Lost & Found Items
      </h2>

      <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Title বা Location দিয়ে খুঁজুন..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 w-full md:w-1/2 border rounded bg-white text-black"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded bg-white text-black"
        >
          <option value="desc">Sort by Date: Newest First</option>
          <option value="asc">Sort by Date: Oldest First</option>
        </select>
      </div>

      {/* Items grid */}
      <div className="grid md:grid-cols-3 gap-6 flex-grow">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ maxHeight: "250px", width: "100%" }}
                />
              </div>
              <div className="p-4 space-y-2 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>

                <div className="flex justify-between text-gray-500 text-sm font-bold">
                  <p>{item.location}</p>
                  <p>{new Date(item.date).toLocaleDateString()}</p>
                </div>

                <p
                  className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                    item.status === "recovered"
                      ? "bg-gray-300 text-gray-800 text-center font-bold"
                      : item.postType === "Lost"
                      ? "bg-red-100 text-red-600 text-center font-bold"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status === "recovered" ? "Recovered" : item.postType}
                </p>

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4"
                  onClick={() => navigate(`/itemdetail/${item._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No items found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2 select-none">
          <button
            className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 ${
                  pageNum === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-black"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LostFoundPages;
