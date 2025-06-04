import React, { useContext } from 'react';
import groovyWalkAnimation from '../../src/assets/register.json.json'
import Lottie from 'lottie-react';
import { Authcontex } from '../AuthContext';
import { updateProfile } from 'firebase/auth';
import ScoilLogin from './ScoilLogin';

const Register = () => {
  const { create } = useContext(Authcontex);

  const handleReg = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(name, photoURL, email, password);

    create(email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .then(() => {
        console.log('User profile updated');
      })
      .catch((error) => {
        console.log(error);
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
                <input type="password" name="password" className="input" placeholder="Password" required />
                <button className="btn btn-neutral mt-4" type="submit">Register</button>
              </fieldset>
            </form>
            <ScoilLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
