import Lottie from "lottie-react";
import groovyWalkAnimation from "../../src/assets/sign/sign.json.json";
import ScoilLogin from "./ScoilLogin";
import Swal from "sweetalert2";
import { Link,  useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const SignIn = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  //const location = useLocation();

  // ✅ আগের পেজের path না থাকলে home("/") এ যাবে
  const from = "/"

/*   const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signin(email, password);

      if (result.user) {
        const saveUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: result.user.email === "admin@lostfound.com" ? "admin" : "user",
        };

        await axios.post(
          "http://localhost:5000/auth",
          saveUser,
          { withCredentials: true }
        );

        Swal.fire("Login Success", "Welcome back!", "success");
        navigate(from, { replace: true }); // ✅ Redirect to previous page or home
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Error", error.message, "error");
    }
  }; */


  const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const result = await signin(email, password);

    if (result.user) {
      const saveUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: result.user.email === "admin@lostfound.com" ? "admin" : "user",
      };

      await axios.post(
        "http://localhost:5000/auth",
        saveUser,
        { withCredentials: true }
      );

      Swal.fire("Login Success", "Welcome back!", "success");
      
      // 🔹 Always redirect to Home page
      navigate(from, { replace: true });
    }
  } catch (error) {
    console.error("Login error:", error);
    Swal.fire("Error", error.message, "error");
  }
};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie animationData={groovyWalkAnimation} loop style={{ width: 200 }} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Sign In</h1>
            <form onSubmit={handleLogin}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
              <label className="label mt-4">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <button type="submit" className="btn btn-neutral mt-6 w-full">
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p>
                New here?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <ScoilLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
