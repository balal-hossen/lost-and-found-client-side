// src/pages/ItemDetails.jsx

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
    axios.get(`http://localhost:5000/items/${id}`).then((res) => {
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
      await axios.post("http://localhost:5000/recovered", recoveryInfo);
      await axios.patch(`http://localhost:5000/items/${item._id}`, {
        status: "recovered",
      });

      alert("Item marked as recovered!");
      setModalIsOpen(false);
      setItem({ ...item, status: "recovered" });

      // Redirect to homepage so card gets updated
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to recover item");
    }
  };

  if (!item || !user) return <div className="text-center mt-10">Loading...</div>;

  if (item.status === "recovered") {
    return (
      <div className="text-center mt-10 text-red-500 text-xl font-semibold">
        This item is already marked as recovered.
      </div>
    );
  }

  const buttonText = item.type === "Lost" ? "Found This!" : "This is Mine!";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card card-side bg-base-500 shadow-lg">
        <figure>
          <img src={item.thumbnail} alt="Item" />
        </figure>
        <div className="card-body">
          <p>{item.title}</p>
          <h2 className="card-title">{item.description}</h2>
          <h1>{item.category}</h1>
          <p>{item.location}</p>
          <p>{item.date}</p>
          <p>{item.postType}</p>
          <p>{item.status}</p>

          <div className="card-actions justify-end">
            <button
              onClick={() => setModalIsOpen(true)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
        className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Recovery Info</h3>
        <form onSubmit={handleSubmit} className="text-black">
          <div className="mb-3">
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

          <div className="mb-3">
            <label className="block mb-1 font-medium">Recovered Date:</label>
            <DatePicker
              selected={recoveredDate}
              onChange={(date) => setRecoveredDate(date)}
              className="w-full border px-3 py-2 rounded"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="mb-3">
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
