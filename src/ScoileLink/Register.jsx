import React, { useContext, useState } from 'react';
import groovyWalkAnimation from '../../src/assets/register.json.json';
import Lottie from 'lottie-react';
import { Authcontex } from '../AuthContext';
import { updateProfile } from 'firebase/auth';
import ScoilLogin from './ScoilLogin';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import SignInGoogle from '../../../../assignments12/Medical-Camp-Management/src/LoginPages/SignInGoogle';

const Register = () => {
  const { create } = useContext(Authcontex);
  const navigate = useNavigate(); // navigation for after register
   const [showPassword, setShowPassword] = useState(false);

  const handleReg = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    create(email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Welcome to WhereIsIt!',
          confirmButtonText: 'Continue',
        }).then(() => {
          // Navigate after alert is confirmed
          navigate('/');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
        console.error(error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie style={{ width: '200px' }} animationData={groovyWalkAnimation} loop={true} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleReg}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name="name" className="input" placeholder="Name" required />
                <label className="label">Photo URL</label>
                <input type="text" name="photo" className="input" placeholder="Photo URL" />
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />
                <label className="label">Password</label>
               <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            minLength="6"
            pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least 6 characters with uppercase and lowercase"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 text-gray-600"
          >
            {showPassword ?<FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
          <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-green-600"
        >
          Register
        </button>
              </fieldset>
            </form>
            <p className='text-center'>  Already have an account?
            <Link className='underline text-red-600 font-bold' to='/sign'> Sign In</Link>
            </p>
            <SignInGoogle/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
