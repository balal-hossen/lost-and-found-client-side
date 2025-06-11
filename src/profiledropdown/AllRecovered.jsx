import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontex } from '../AuthContext';

const AllRecovered = () => {
  const { user } = useContext(Authcontex);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableView, setIsTableView] = useState(false); // Toggle layout

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/recovered?email=${user.email}`, {
        withCredentials: 'include'
      })
      .then((res) => {
        setRecoveredItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading recovered items:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No recovered items found for your account.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 my-20">
      <h2 className="text-2xl font-bold mb-6 text-center">My Recovered Items</h2>

      <div className="text-center mb-6">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          aria-label="Toggle layout view"
        >
          Change Layout
        </button>
      </div>

      {isTableView ? (
        // Table Layout with responsive overflow-x and smaller font on mobile
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
                  <td className="py-2 px-4 border whitespace-nowrap">{item.title}</td>
                  <td className="py-2 px-4 border whitespace-nowrap">{item.recoveredLocation}</td>
                  <td className="py-2 px-4 border whitespace-nowrap">{item.recoveredBy?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border whitespace-nowrap">{item.recoveredDate?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Layout responsive grid: 1 col mobile, 2 sm, 3 md+, gap 6
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white text-black shadow-md rounded-lg p-5 border hover:shadow-lg transition flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-3 truncate">{item.title}</h3>
              <p className="mb-1"><span className="font-medium">Location:</span> {item.recoveredLocation}</p>
              <p className="mb-1"><span className="font-medium">Recovered By:</span> {item.recoveredBy?.name || 'N/A'}</p>
              <p><span className="font-medium">Date:</span> {item.recoveredDate?.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
