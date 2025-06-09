import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontex } from '../AuthContext';

const AllRecovered = () => {
  const { user } = useContext(Authcontex);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableView, setIsTableView] = useState(false); // 🔄 Toggle layout

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/recovered?email=${user.email}`)
      .then((res) => {
        console.log("Recovered data:", res.data);
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
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Recovered Items</h2>

      <div className="text-center mb-6">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Change Layout
        </button>
      </div>

      {isTableView ? (
        // ✅ Table Layout
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border text-black rounded shadow">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Recovered By</th>
                <th className="py-2 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr key={item._id} className="text-center hover:bg-blue-50">
                  <td className="py-2 px-4 border">{item.title}</td>
                  <td className="py-2 px-4 border">{item.recoveredLocation}</td>
                  <td className="py-2 px-4 border">{item.recoveredBy?.name}</td>
                  <td className="py-2 px-4 border">{item.recoveredDate?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ✅ Card Layout (3-column grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white text-black shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p><span className="font-medium">Location:</span> {item.recoveredLocation}</p>
              <p><span className="font-medium">Recovered By:</span> {item.recoveredBy?.name}</p>
              <p><span className="font-medium">Date:</span> {item.recoveredDate?.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
