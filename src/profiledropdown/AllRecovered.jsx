import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontex } from '../AuthContext';

const AllRecovered = () => {
  const { user } = useContext(Authcontex);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!user?.email) return;
  console.log('email', user.email)
    axios.get(`http://localhost:5000/recovered?email=${user.email}`)

    .then(res => {
      console.log("Recovered data:", res.data); 
      setRecoveredItems(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error loading recovered items:", err);
      setLoading(false);
    });
}, [user?.email]);


  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (recoveredItems.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No recovered items found for your account.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Recovered Items</h2>
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
            {recoveredItems.map(item => (
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
    </div>
  );
};

export default AllRecovered;
