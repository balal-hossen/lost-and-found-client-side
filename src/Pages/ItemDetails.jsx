import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Authcontex } from "../AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Authcontex);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`https://lost-and-found-hazel.vercel.app/items/${id}`, { withCredentials: true })
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in to submit recovery info.",
      });
      return;
    }

    const recoveryInfo = {
      itemId: item._id,
      title: item.title,
      thumbnail: item.thumbnail,
      postType: item.postType,
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    };

    try {
      await axios.post(
        "https://lost-and-found-hazel.vercel.app/recovered",
        recoveryInfo,
        { withCredentials: true }
      );

      await axios.patch(
        `https://lost-and-found-hazel.vercel.app/items/${item._id}`,
        {
          status: "recovered",
          recoveredLocation,
          recoveredDate,
        },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Item marked as recovered!",
        timer: 2000,
        showConfirmButton: false,
      });

      setModalIsOpen(false);
      setItem({ ...item, status: "recovered", recoveredLocation, recoveredDate });

      navigate("/allrecoverd");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to recover item. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Item not found.
      </div>
    );
  }

  if (item.status === "recovered") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-green-50 border border-green-200 rounded-xl shadow-lg max-w-md w-full p-6 text-center">
          <img
            src={item.thumbnail}
            alt="Recovered Item"
            className="w-48 h-48 object-cover rounded-lg mx-auto border border-green-300"
          />
          <h2 className="text-2xl font-bold text-green-700 mt-4">{item.title}</h2>
          <p className="text-gray-600 mt-2">{item.description}</p>

          <div className="mt-4 space-y-2 text-left">
            <p><strong className="text-green-800">Category:</strong><span className="text-black ml-2 font-bold"> {item.category}</span></p>
            <p><strong className="text-green-800">Recovered Location:</strong> <span className="text-black ml-2 font-bold">{item.recoveredLocation}</span></p>
            <p><strong className="text-green-800 ">Recovered Date:</strong><span className="text-black ml-2 font-bold">
               {item.recoveredDate ? new Date(item.recoveredDate).toLocaleDateString() : ""}
              </span></p>
          </div>

          <div className="mt-6">
            <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full font-semibold text-sm">
              ✅ Already Recovered
            </span>
          </div>
        </div>
      </div>
    );
  }

  const buttonText = item.postType === "Lost" ? "Found This!" : "This is Mine!";

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <Helmet>
        <title>Details Items | WhereIsIt</title>
        <meta name="description" content="Your recovered items list in WhereIsIt platform." />
      </Helmet>

   <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300 mt-20 border border-gray-100">
  {/* Left Side Image */}
  <div className="md:w-1/2 relative group">
    <img
      src={item.thumbnail}
      alt={item.title}
      className="w-full h-72 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
    />
    {/* Status Badge */}
    <span
      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
        item.status === "recovered"
          ? "bg-green-100 text-green-700"
          : item.postType === "Lost"
          ? "bg-red-100 text-red-600"
          : "bg-blue-100 text-blue-600"
      }`}
    >
      {item.status === "recovered" ? "Recovered" : item.postType}
    </span>
  </div>

  {/* Right Side Text */}
  <div className="p-8 flex flex-col justify-between md:w-1/2">
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
      <p className="text-gray-600">{item.description}</p>

      <div className="space-y-1 text-sm text-gray-500">
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p>
          <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
        </p>
        <p><strong>Post Type:</strong> {item.postType}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="font-semibold text-blue-700">{item.status}</span>
        </p>
      </div>
    </div>

    {/* Action Button */}
    <div className="pt-6 text-right">
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
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
              className="w-full border text-black px-3 py-2 rounded"
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
