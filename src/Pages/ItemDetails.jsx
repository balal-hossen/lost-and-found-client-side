import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Authcontex } from "../AuthContext";

Modal.setAppElement("#root");

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Authcontex);
  const [item, setItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`https://lost-and-found-hazel.vercel.app/items/${id}`)
      .then((res) => {
        setItem(res.data);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recoveryInfo = {
      itemId: item._id,
      title: item.title,
      image: item.image,
      type: item.type,
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      // 1. Save recovery info (Must include withCredentials)
      await axios.post("https://lost-and-found-hazel.vercel.app/recovered", recoveryInfo, {
        withCredentials: true,
      });

      // 2. Update item status and recovered fields
      await axios.patch(`https://lost-and-found-hazel.vercel.app/items/${item._id}`, {
        status: "recovered",
        recoveredLocation,
        recoveredDate,
      });

      alert("Item marked as recovered!");
      setModalIsOpen(false);
      setItem({ ...item, status: "recovered", recoveredLocation, recoveredDate });

      navigate("/allrecoverd");
    } catch (error) {
      console.error(error);
      alert("Failed to recover item");
    }
  };

  if (!item || !user) return <div className="text-center mt-10">Loading...</div>;

  if (item.status === "recovered") {
    return (
      <div className="text-center mt-10 text-green-600 text-lg font-semibold space-y-2">
        <p>This item is already marked as recovered.</p>
        <p><strong>Recovered Location:</strong> {item.recoveredLocation}</p>
        <p><strong>Recovered Date:</strong> {item.recoveredDate?.slice(0, 10)}</p>
      </div>
    );
  }

  const buttonText = item.type === "Lost" ? "Found This!" : "This is Mine!";

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl mt-20 p-10 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={item.thumbnail}
            alt="Item"
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2 space-y-2">
          <p className="text-xl font-bold text-gray-700">{item.title}</p>
          <h2 className="text-md text-gray-600">{item.description}</h2>
          <p className="text-sm text-gray-500">Category: {item.category}</p>
          <p className="text-sm text-gray-500">Location: {item.location}</p>
          <p className="text-sm text-gray-500">Date: {item.date}</p>
          <p className="text-sm text-gray-500">Post Type: {item.postType}</p>
          <p className="text-sm font-semibold text-blue-700">Status: {item.status}</p>

          <div className="pt-4 text-right">
            <button
              onClick={() => setModalIsOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Recovery Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg border"
      >
        <h3 className="text-xl font-semibold mb-4">Recovery Info</h3>
        <form onSubmit={handleSubmit} className="text-black space-y-4">
          <div>
            <label className="block mb-1 font-medium">Recovered Location:</label>
            <input
              type="text"
              required
              value={recoveredLocation}
              onChange={(e) => setRecoveredLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Rangpur Police Station"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Recovered Date:</label>
            <DatePicker
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              className="w-full border px-3 py-2 rounded"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Recovered By:</label>
            <input
              type="text"
              readOnly
              value={`${user.displayName} (${user.email})`}
              className="w-full border px-3 py-2 bg-gray-100 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit Recovery
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ItemDetails;
