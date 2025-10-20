import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontex } from '../AuthContext';
import { AiOutlineMenu, AiOutlineTable } from "react-icons/ai";
import { Helmet } from 'react-helmet-async';

const AllRecovered = () => {
  const { user } = useContext(Authcontex);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTableView, setIsTableView] = useState(false); // false = card view

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`https://lost-and-found-hazel.vercel.app/recovered?email=${user.email}`, {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <svg
          className="animate-spin h-12 w-12 text-blue-600 mb-3"
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
        <p className="text-blue-600 text-lg font-semibold">Loading recovered items...</p>
      </div>
    );
  }
if (!recoveredItems.length) {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] items-center justify-center px-4">
    <h1 className='text-center text-2xl font-bold mt-20'> Recovered items</h1>
      <p className="text-gray-500 text-lg text-center">
        No recovered items found for your account.
      </p>
      <img className=' w-full' src='https://i.ibb.co.com/N26zxRzr/original-a7b7223a9d22f6f90015deb8d9ad0d9d.webp' alt='' />
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] mt-10 px-4 my-20  ">
      {/* min-h-[calc(100vh-4rem)] — Full viewport height থেকে navbar/footer এর উচ্চতা বাদ দিয়ে content */}
      {/* যদি Footer এর উচ্চতা 4rem ধরে নেই */}

      <Helmet>
        <title>All Recovered Items | WhereIsIt</title>
        <meta
          name="description"
          content="Your recovered items list in WhereIsIt platform."
        />
      </Helmet>

      {/* Header and view buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">My Recovered Items</h2>
        <div className="flex space-x-3 mr-4">
          {/* Card View Button */}
          <button
            onClick={() => setIsTableView(false)}
            className={`p-2 rounded-full transition ${
              !isTableView ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
            title="Card View"
          >
            <AiOutlineTable size={20} />
          </button>
          {/* Table View Button */}
          <button
            onClick={() => setIsTableView(true)}
            className={`p-2 rounded-full transition ${
              isTableView ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
            }`}
            title="Table View"
          >
            <AiOutlineMenu size={20} />
          </button>
        </div>
      </div>

      {/* Conditional View */}
      {isTableView ? (
        // Table View
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border text-black rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border text-left">Title</th>
                <th className="py-2 px-4 border text-left">Location</th>
                <th className="py-2 px-4 border text-left">Recovered By</th>
                <th className="py-2 px-4 border text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-blue-50 text-sm sm:text-base"
                >
                  <td className="py-2 px-4 border break-words max-w-xs">
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border break-words max-w-xs">
                    {item.recoveredLocation}
                  </td>
                  <td className="py-2 px-4 border break-words max-w-xs">
                    {item.recoveredBy?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.recoveredDate?.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white text-black shadow-md rounded-lg p-5 border hover:shadow-lg transition h-full flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-3 truncate">{item.title}</h3>
              <p className="mb-1 flex-grow">
                <span className="font-medium">Location:</span> {item.recoveredLocation}
              </p>
              <p className="mb-1">
                <span className="font-medium">Recovered By:</span>{" "}
                {item.recoveredBy?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Date:</span> {item.recoveredDate?.slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
