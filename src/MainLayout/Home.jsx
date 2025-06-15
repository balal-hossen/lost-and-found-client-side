import BannerSlider from '../componets/BannerSlider';
import LatestItems from '../componets/LatestItems';
import ExtraSection from '../componets/ExtraSection';
import ExtraSectionTwo from '../componets/ExtraTwoSection';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Authcontex } from '../AuthContext';
import groovyWalkAnimation from '../../src/assets/animetion/ani.json.json';
import Lottie from 'lottie-react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(Authcontex);

  useEffect(() => {
    axios
      .get(`https://lost-and-found-hazel.vercel.app/items/home`)
      .then(res => {
        console.log("API response from /items/home:", res.data);
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setItems([]); // fallback empty array
        }
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setItems([]); // error
      });
  }, []);

  const filteredItems = Array.isArray(items)
    ? items.filter(item =>
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div>
      <BannerSlider />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Lost & Found Items
        </h2>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.description?.slice(0, 80)}...
                  </p>

                  <p className="text-gray-500 text-sm">{item.location}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  <p
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      item.status === "recovered"
                        ? "bg-gray-300 text-gray-800"
                        : item.postType === "Lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.status === "recovered" ? "Recovered" : item.postType}
                  </p>

                  <div className="pt-2">
                    {user ? (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                        onClick={() => navigate(`/itemdetail/${item._id}`)}
                      >
                        View Details
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                        onClick={() => navigate(`/sign?redirect=/itemdetail/${item._id}`)}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center ml-33 lg:ml-3  text-3xl text-gray-500 mt-10 flex">No items found..
             <div className="text-center lg:text-left">
          <Lottie style={{ width: '200px' }} animationData={groovyWalkAnimation} loop={true} />
        </div>
            </p>
          )}
        </div>

        <LatestItems />
        <div className="mt-14">
          <ExtraSection />
          <ExtraSectionTwo />
        </div>
      </div>
    </div>
  );
};

export default Home;
