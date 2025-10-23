
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const item = useLoaderData();
  console.log(item)
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedItem = {
      title: form.title.value,
      category: form.category.value,
      status: form.status.value,
      date: form.date.value,
      email: form.email.value,
      name: form.name.value
    };

    fetch(`http://localhost:5000/items/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success!", "Item updated successfully.", "success");
          navigate("/manage");
        }
      });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
       <Helmet>
        <title>Update | WhereIsIt</title>
        <meta name="description" content="Your recovered items list in WhereIsIt platform." />
      </Helmet>
      <h2 className="text-xl font-bold mb-4">Update Item</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="title" defaultValue={item.title} placeholder="Title" className="input input-bordered w-full" required />
        <input type="text" name="category" defaultValue={item.category} placeholder="Category" className="input input-bordered w-full" required />
        <input type="text" name="status" defaultValue={item.status} placeholder="Status" className="input input-bordered w-full" required />
        <input type="date" name="date" defaultValue={item.date} className="input input-bordered w-full" required />

        <input type="email" name="email" defaultValue={item.userName} className="input input-bordered w-full bg-gray-100 text-black" readOnly />
        <input type="text" name="name" defaultValue={item.userEmail} className="input input-bordered w-full bg-gray-100 text-black" readOnly />

        <button type="submit" className="btn btn-primary w-full">Update</button>
        
      </form>
    </div>
  );
};

export default UpdateItem;
