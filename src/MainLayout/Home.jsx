import BannerSlider from "../componets/BannerSlider";
import ExtraSection from "../componets/ExtraSection";
//import ExtraSectionTwo from '../componets/ExtraTwoSection';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Authcontex } from "../AuthContext";
import groovyWalkAnimation from "../../src/assets/animetion/ani.json.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import Reviews from "../Pages/Reviews";
import SuccessStory from "../componets/SuccessStory";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(Authcontex);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`) // 🔹 backend থেকে সব items fetch
      .then((res) => {
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, []);

  // 🔹 Search + filter
  let filteredItems = Array.isArray(items)
    ? items.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  // 🔹 Latest 6 items
  const latest6 = filteredItems
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (loading) {
    return (
      <div className="flex items-center text-black justify-center h-screen">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-spinner text-blue-500 loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>WhereIsIt | Home</title>
      </Helmet>

      <BannerSlider />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Lost & Found Items
        </h2>

        {/* 🔹 Search Box */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* 🔹 Latest 6 items grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest6.length > 0 ? (
            latest6.map((item) => (
              <div
                key={item._id}
                className=" rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg md:hover:scale-[1] lg:hover:scale-[1.06] flex flex-col"
                style={{ minHeight: "400px" }}
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full  h-full object-cover transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold  mb-2">
                    {item.title}
                  </h3>

                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm font-bold">{item.location}</p>
                    <p className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</p>
                  </div>

                  <p
                    className={`inline-block px-6 py-1 text-xs rounded mt-2 ${
                      item.status === "recovered"
                        ? "bg-gray-300 font-bold text-center text-gray-800"
                        : item.postType === "Lost"
                        ? "bg-red-100 text-red-600 font-bold text-center"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    Status: {item.status === "recovered" ? "Recovered" : item.postType}
                  </p>

                  <div className="pt-4">
                    {user ? (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
                        onClick={() => navigate(`/itemdetail/${item._id}`)}
                      >
                        View Details
                      </button>
                    ) : (
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
                        onClick={() =>
                          navigate(`/sign?redirect=/itemdetail/${item._id}`)
                        }
                      >
                        See More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen w-full">
              <p className="text-3xl text-gray-500 mb-6 text-center">No items found..</p>
              <div className="w-full max-w-[600px]">
                <Lottie
                  className="w-full lg:w-[70rem] h-auto lg:ml-30"
                  animationData={groovyWalkAnimation}
                  loop={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* 🔹 See All Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow-md transition"
            onClick={() => navigate('/lostpages')}
          >
            See All
          </button>
        </div>



        

        {/* 🔹 Extra Sections */}
        <div className="mt-14">
          <ExtraSection />
          <Reviews />
        </div>
        <SuccessStory />
      </div>
    </div>
  );
};

export default Home;
