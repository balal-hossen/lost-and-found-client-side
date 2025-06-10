import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Authcontex } from "../AuthContext";
import { Link } from "react-router";


const ManageMyItem = () => {
  const { user } = useContext(Authcontex);
  const [myItems, setMyItems] = useState([]);

  const fetchMyItems = () => {
    fetch(`http://localhost:5000/items?email=${user?.email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Items:", data);
        if (Array.isArray(data)) {
          setMyItems(data);
        } else if (Array.isArray(data?.data)) {
          setMyItems(data.data);
        } else {
          setMyItems([]); // fallback empty
        }
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setMyItems([]); // fallback
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
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item has been deleted.", "success");
              fetchMyItems();
            }
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage My Items</h2>
      {myItems.length === 0 ? (
        <p className="text-gray-500">You haven’t added any items yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map(item => (
                <tr key={item._id} className="text-center border-t">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/updateItems/${item._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyItem;
