import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ScoilLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get("redirect") || "/";

  const signInGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const saveUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: user.email === "admin@lostfound.com" ? "admin" : "user",
      };

      // ✅ Backend call to /auth (NOT /users)
      await axios.post(
        "http://localhost:5000/auth",
        saveUser,
        { withCredentials: true }
      );

      Swal.fire("Login Successful!", "Welcome back!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={signInGoogle}
        className="btn bg-white w-full text-black border-[#e5e5e5]"
      >
        <FcGoogle /> Login with Google
      </button>
    </div>
  );
};

export default ScoilLogin;
