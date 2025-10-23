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
    axios.get(`http://localhost:5000/items/${id}`, { withCredentials: true })
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({ icon: "error", title: "Login required", text: "You must be logged in!" });
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
        image: user.photoURL
      }
    };

    try {
      await axios.post("http://localhost:5000/recovered", recoveryInfo, { withCredentials: true });
      setItem({ ...item, status: "recovered", recoveredLocation, recoveredDate });
      setModalIsOpen(false);

      Swal.fire({
        icon: "success",
        title: "Recovered!",
        text: "Item has been marked as recovered.",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed", text: "Could not recover item." });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!item) return <p className="text-center mt-10">Item not found</p>;

  if (item.status === "recovered") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-green-50 border border-green-200 rounded-xl shadow-lg max-w-md w-full p-6 text-center">
          <img src={item.thumbnail} alt={item.title} className="w-48 h-48 object-cover mx-auto rounded-lg"/>
          <h2 className="text-2xl font-bold text-green-700 mt-4">{item.title}</h2>
          <p>{item.description}</p>
          <p>Recovered Location: {item.recoveredLocation}</p>
          <p>Recovered Date: {new Date(item.recoveredDate).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen">
      <Helmet>
        <title>Item Details | WhereIsIt</title>
      </Helmet>

      <div className="bg-white rounded-xl shadow-md flex md:flex-row flex-col">
        <img src={item.thumbnail} className="md:w-1/2 w-full h-64 object-cover"/>
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Location: {item.location}</p>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            <p>Status: {item.status}</p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => setModalIsOpen(true)}
          >
            {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
          </button>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-white p-6 max-w-lg mx-auto mt-20 rounded shadow-lg border">
        <h3 className="text-xl font-semibold mb-4">Recovery Info</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Recovered Location:</label>
            <input type="text" value={recoveredLocation} onChange={(e)=>setRecoveredLocation(e.target.value)} className="w-full border px-3 py-2 rounded" required/>
          </div>
          <div>
            <label>Recovered Date:</label>
            <DatePicker selected={recoveredDate} onChange={(date)=>setRecoveredDate(date)} className="w-full border px-3 py-2 rounded" dateFormat="yyyy-MM-dd"/>
          </div>
          <div>
            <label>Recovered By:</label>
            <input type="text" readOnly value={`${user.displayName} (${user.email})`} className="w-full border px-3 py-2 rounded bg-gray-100"/>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Recovery</button>
        </form>
      </Modal>
    </div>
  );
};

export default ItemDetails;
