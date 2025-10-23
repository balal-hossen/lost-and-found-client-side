import Lottie from "lottie-react";
import groovyWalkAnimation from "../../src/assets/register.json.json";
import { useAuth } from "../AuthContext";
import { updateProfile } from "firebase/auth";
import ScoilLogin from "./ScoilLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const { create } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleReg = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await create(email, password);
      await updateProfile(result.user, { displayName: name, photoURL });

      const newUser = {
        name,
        email,
        photoURL,
        role: email === "admin@lostfound.com" ? "admin" : "user",
      };

      // ✅ Call /auth route
      await axios.post(
        "http://localhost:5000/auth",
        newUser,
        { withCredentials: true }
      );

      Swal.fire("Registration Successful!", "Welcome to Lost & Found!", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Registration Failed", error.message, "error");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: "200px" }} animationData={groovyWalkAnimation} loop />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register</h1>
            <form onSubmit={handleReg}>
              <label className="label">Name</label>
              <input type="text" name="name" className="input input-bordered" required />
              <label className="label">Photo URL</label>
              <input type="text" name="photo" className="input input-bordered" />
              <label className="label">Email</label>
              <input type="email" name="email" className="input input-bordered" required />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  minLength="6"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              <button type="submit" className="btn btn-success w-full mt-4">
                Register
              </button>
            </form>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/sign" className="underline text-blue-600 font-bold">
                Sign In
              </Link>
            </p>
            <ScoilLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
