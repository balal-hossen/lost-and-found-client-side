
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../src/assets/sign/sign.json.json';
import ScoilLogin from './ScoilLogin';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

const SignIn = () => {
  const { signin } =useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  //  get redirect path from query string, fallback to "/"
  const from = new URLSearchParams(location.search).get('redirect') || '/';

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signin(email, password)
      .then(result => {
        if (result.user) {
          Swal.fire("Login success", "Welcome back!", "success");
          navigate(from); //redirect to original page after login
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Swal.fire("Error", error.message, "error");
      });
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

              <div className="mt-2">
                <a href="#" className="link link-hover">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-neutral mt-6 w-full">
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p>
                New here? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
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
