import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Authcontex } from "../AuthContext";
import { Link } from "react-router";


const ManageMyItem = () => {
  const { user } = useContext(Authcontex);
  const [myItems, setMyItems] = useState([]);

  const fetchMyItems = () => {
    fetch(`http://localhost:5000/items?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMyItems(data);
        } else if (Array.isArray(data?.data)) {
          setMyItems(data.data);
        } else {
          setMyItems([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setMyItems([]);
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
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/items/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item has been deleted.", "success");
              fetchMyItems();
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

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage My Items</h2>

      {myItems.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any items yet.</p>
      ) : (
        <>
          {/* বড় স্ক্রীনে টেবিল */}
          <div className="hidden md:block overflow-x-auto rounded shadow-md">
            <table className="table-auto w-full border-collapse border border-gray-300">
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
                {myItems.map((item) => (
                  <tr
                    key={item._id}
                    className="text-center border-t border-gray-300 hover:bg-green-500"
                  >
                    <td className="px-4 py-2 border border-gray-300 text-left">{item.title}</td>
                    <td className="px-4 py-2 border border-gray-300 text-left">{item.category}</td>
                    <td className="px-4 py-2 border border-gray-300 text-left capitalize">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-left">
                      {formatDate(item.date)}
                    </td>
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

          {/* মোবাইলে কার্ড ভিউ */}
          <div className="md:hidden grid gap-4">
            {myItems.map((item) => (
              <div
                key={item._id}
                className="bg-white text-black shadow rounded p-4 border border-gray-300"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{item.status}</span>
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
        </>
      )}
    </div>
  );
};

export default ManageMyItem;
