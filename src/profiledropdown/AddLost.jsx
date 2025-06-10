import { useForm } from "react-hook-form";
//import { useAuth } from "../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Authcontex } from "../AuthContext";
import Swal from "sweetalert2";

const AddLost = () => {

    
  const { user } = useContext(Authcontex);
  const { register, handleSubmit, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = async (data) => {
    const itemData = {
      ...data,
      date: selectedDate,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      status: "pending", // default status
    };

    try {
      const res = await axios.post("http://localhost:5000/items", itemData,{
        withCredentials:'include'
      });
      if (res.data.insertedId) {
        
Swal.fire({
  title: "Add Items!",
  icon: "success",
  draggable: true
});
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong!",err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-black bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Lost or Found Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register("postType")} className="w-full border p-2 rounded" required>
          <option value="">Select Post Type</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input {...register("thumbnail")} className="w-full border p-2 rounded" placeholder="Image URL" required />

        <input {...register("title")} className="w-full border p-2 rounded" placeholder="Title" required />

        <textarea {...register("description")} className="w-full border p-2 rounded" placeholder="Description" rows={3} required />

        <input {...register("category")} className="w-full border p-2 rounded" placeholder="Category (e.g., gadgets)" required />

        <input {...register("location")} className="w-full border p-2 rounded" placeholder="Location" required />

        <div className="flex flex-col">
          <label className="mb-1">Date</label>
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="border p-2 rounded" />
        </div>

        <input value={user.displayName} readOnly className="w-full border p-2 rounded bg-gray-100" />
        <input value={user.email} readOnly className="w-full border p-2 rounded bg-gray-100" />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Post</button>
      </form>
    </div>
  );
};

export default AddLost;
