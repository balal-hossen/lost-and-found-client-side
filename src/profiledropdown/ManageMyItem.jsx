import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Authcontex } from "../AuthContext";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const ManageMyItem = () => {
  const { user } = useContext(Authcontex);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMyItems = () => {
    setLoading(true);
    fetch(`http://localhost:5000/items?email=${user?.email}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMyItems(data);
        } else {
          setMyItems([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setMyItems([]);
      })
      .finally(() => {
        setLoading(false);
        setCurrentPage(1); // Reset page on data load
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyItems();
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/items/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your item has been deleted successfully.", "success");
              const remaining = myItems.filter((item) => item._id !== id);
              setMyItems(remaining);
              // Adjust page if current page is now out of range
              const maxPage = Math.ceil(remaining.length / itemsPerPage);
              if (currentPage > maxPage) setCurrentPage(maxPage);
            }
          });
      }
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Pagination calculations
  const totalPages = Math.ceil(myItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = myItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen flex flex-col">
      <Helmet>
        <title>Manage Items | WhereIsIt</title>
        <meta name="description" content="Your recovered items list in WhereIsIt platform." />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-shadow-orange-400 text-center">Manage My Items</h2>

      {loading ? (
        <div className="flex justify-center items-center my-20">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="text-blue-600 font-semibold text-lg">Loading...</span>
        </div>
      ) : myItems.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any items yet.</p>,
        <img className="w-full" src="https://i.ibb.co.com/N26zxRzr/original-a7b7223a9d22f6f90015deb8d9ad0d9d.webp" alt="" />
      ) : (
        <>
          {/* big screen table */}
          <div className="hidden md:block overflow-x-auto rounded shadow-md text-black">
            <table className="table-auto w-full border-collapse border text-blue-700 font-bold border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="px-4 py-3 border border-gray-300 text-left">Title</th>
                  <th className="px-4 py-3 border border-gray-300 text-left">Category</th>
                  <th className="px-4 py-3 border border-gray-300 text-left">Status</th>
                  <th className="px-4 py-3 border border-gray-300 text-left">Date</th>
                  <th className="px-4 py-3 border border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr
                    key={item._id}
                    className="text-center border-t border-gray-300 hover:bg-green-50"
                  >
                    <td className="px-4 py-2 border border-gray-300 text-left">{item.title}</td>
                    <td className="px-4 py-2 border border-gray-300 text-left">{item.category}</td>
                    <td className="px-4 py-2 border border-gray-300 text-left capitalize">{item.status}</td>
                    <td className="px-4 py-2 border border-gray-300 text-left">{formatDate(item.date)}</td>
                    <td className="px-4 py-2 border border-gray-300 space-x-2 text-left">
                      <Link to={`/updateItems/${item._id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="md:hidden grid gap-4">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="bg-white text-black shadow rounded p-4 border border-gray-300"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Status:</strong> <span className="capitalize">{item.status}</span>
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(item.date)}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link to={`/updateItems/${item._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition w-full">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
        </>
      )}
    </div>
  );
};

export default ManageMyItem;
