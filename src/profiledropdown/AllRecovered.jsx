import { useEffect, useState } from 'react';
import axios from 'axios';

import { AiOutlineMenu, AiOutlineTable } from "react-icons/ai";
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";
import { useAuth } from '../AuthContext';

const AllRecovered = () => {
  const { user } = useAuth();
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTableView, setIsTableView] = useState(false); // false = card view

  // Feedback Modal State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  // ===== fetch approved recovered items =====
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/recovered?email=${user.email}&status=approved`, {
        withCredentials: true,
      })
      .then((res) => {
        setRecoveredItems(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading recovered items:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // Feedback Modal
  const openFeedbackModal = (item) => {
    setSelectedItem(item);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem || !user) return;

    const feedbackData = {
      itemId: selectedItem._id,
      itemTitle: selectedItem.title,
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      userPhoto: user.photoURL,
      rating,
      feedbackText,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/feedback",
        feedbackData,
        { withCredentials: true }
      );
      if (res.data.feedbackId) {
        Swal.fire("Thank You!", "Your feedback has been submitted!", "success");
        setShowFeedbackModal(false);
        setRating(0);
        setFeedbackText("");
      }
    } catch (err) {
      console.error("Feedback error:", err);
      Swal.fire("Error", "Failed to send feedback.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <svg className="animate-spin h-12 w-12 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-blue-600 text-lg font-semibold">Loading recovered items...</p>
      </div>
    );
  }

  if (!recoveredItems.length) {
    return (
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] items-center justify-center px-4">
        <h1 className='text-center text-2xl font-bold mt-20'> Recovered items</h1>
        <p className="text-gray-500 text-lg text-center">No approved recovered items found for your account.</p>
        <img className='w-full' src='https://i.ibb.co/N26zxRzr/original-a7b7223a9d22f6f90015deb8d9ad0d9d.webp' alt='No items' />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] mt-10 px-4 my-20">
      <Helmet>
        <title>All Recovered Items | WhereIsIt</title>
        <meta name="description" content="Your recovered items list in WhereIsIt platform." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">My Recovered Items</h2>
        <div className="flex space-x-3 mr-4">
          <button onClick={() => setIsTableView(false)} className={`p-2 rounded-full transition ${!isTableView ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`} title="Card View">
            <AiOutlineTable size={20} />
          </button>
          <button onClick={() => setIsTableView(true)} className={`p-2 rounded-full transition ${isTableView ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`} title="Table View">
            <AiOutlineMenu size={20} />
          </button>
        </div>
      </div>

      {isTableView ? (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border text-black rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Location</th>
                <th className="py-2 px-4 border text-left">Recovered By</th>
                <th className="py-2 px-4 border text-left">Date</th>
                <th className="py-2 px-4 border text-left">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50 text-sm sm:text-base">
                  <td className="py-2 px-4 border break-words max-w-xs">{item.title}</td>
                  <td className="py-2 px-4 border break-words max-w-xs">{item.recoveredLocation}</td>
                  <td className="py-2 px-4 border break-words max-w-xs">{item.recoveredBy?.name || "N/A"}</td>
                  <td className="py-2 px-4 border">{item.recoveredDate?.slice(0, 10)}</td>
                  <td className="py-2 px-4 border">
                    <button onClick={() => openFeedbackModal(item)} className="btn btn-sm btn-primary">Feedback</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div key={item._id} className="bg-white text-black shadow-md rounded-lg p-5 border hover:shadow-lg transition h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-3 truncate">{item.title}</h3>
              <p className="mb-1 flex-grow"><span className="font-medium">Location:</span> {item.recoveredLocation}</p>
              <p className="mb-1"><span className="font-medium">Recovered By:</span> {item.recoveredBy?.name || "N/A"}</p>
              <p><span className="font-medium">Date:</span> {item.recoveredDate?.slice(0, 10)}</p>
              <button onClick={() => openFeedbackModal(item)} className="btn btn-sm btn-outline btn-primary mt-2">Feedback</button>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h3 className="text-2xl font-semibold mb-3 text-center text-blue-600">
              Feedback for {selectedItem.title}
            </h3>

            <div className="flex items-center mb-4">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt={user?.displayName || "User"}
                className="w-10 h-10 rounded-full mr-3"
              />
              <p className="font-medium">{user?.displayName || "Anonymous"}</p>
            </div>

            <form onSubmit={handleFeedbackSubmit}>
              {/* Rating */}
              <div className="flex justify-center mb-3">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Write your feedback here..."
                className="textarea textarea-bordered w-full mb-4"
                rows="4"
                required
              ></textarea>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AllRecovered;
