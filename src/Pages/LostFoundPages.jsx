import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Authcontex } from "../AuthContext";
import { Helmet } from "react-helmet-async";

const LostFoundPages = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // default latest first

  const navigate = useNavigate();
  const { user } = useContext(Authcontex);

  useEffect(() => {
    axios
      .get(`https://lost-and-found-hazel.vercel.app/items`)
      .then((res) => {
        setAllItems(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => console.error("Axios Error:", err));
  }, []);

  useEffect(() => {
    const lowerText = searchText.toLowerCase();
    let matched = allItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowerText) ||
        item.location?.toLowerCase().includes(lowerText)
    );

    // date অনুসারে sort করা হচ্ছে
    matched.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === "asc") {
        return dateA - dateB;  // পুরাতন থেকে নতুন
      } else {
        return dateB - dateA;  // নতুন থেকে পুরাতন
      }
    });

    setFilteredItems(matched);
  }, [searchText, allItems, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Lost & Found Items | WhereIsIt</title>
        <meta name="description" content="সব Lost & Found items দেখুন এবং খুঁজুন।" />
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        All Lost & Found Items
      </h2>

      <div className="mb-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Title বা Location দিয়ে খুঁজুন..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 w-full md:w-1/2 border rounded text-black"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded text-black"
        >
          <option value="desc">Sort by Date: Newest First</option>
          <option value="asc">Sort by Date: Oldest First</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
  <div
    key={item._id}
    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col"
  >
    <div className="overflow-hidden">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full object-cover transition-transform duration-300 hover:scale-110"
        style={{ maxHeight: "250px", width: "100%" }}
      />
    </div>
    <div className="p-4 space-y-2 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>

      <p className="text-gray-600 text-sm flex-grow">
        {item.description?.slice(0, 80)}...
      </p>

      <div className="flex justify-between text-gray-500 text-sm font-bold">
        <p>{item.location}</p>
        <p>{new Date(item.date).toLocaleDateString()}</p>
      </div>

      <p
        className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
          item.status === "recovered"
            ? "bg-gray-300 text-gray-800 font-bold"
            : item.postType === "Lost"
            ? "bg-red-100 text-red-600 font-bold"
            : "bg-green-100 text-green-600"
        }`}
      >
        {item.status === "recovered" ? "Recovered" : item.postType}
      </p>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4"
        onClick={() => navigate(`/itemdetail/${item._id}`)}
      >
        View Details
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default LostFoundPages;
