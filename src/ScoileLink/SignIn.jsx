import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../src/assets/sign/sign.json.json';
import { Authcontex } from '../AuthContext';
import ScoilLogin from './ScoilLogin';

//import { useLocation, useNavigate } from 'react-router';

//import { useLocation, useNavigate } from 'react-router';

const SignIn = () => {
  const { signin } = useContext(Authcontex);    
             ///////////////////////////privetroute set korar start
  //const location = useLocation();
  //console.log('location in sign in',location)

 //const navigate = useNavigate(); 
 //const belal1 = location.state?.from?.pathname || '/';
              ///////////////////////////privetroute set korar start



  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password)

     signin(email, password)
      .then(result => {
        console.log(result.user)
        //navigate(belal1);//akhane privetroute set kore dithe hobe
    
      })
      .catch(error => {
        console.error('Login error:', error);
      }); 
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
         <div className="text-center lg:text-left">
          <Lottie
            animationData={groovyWalkAnimation}
            loop
            style={{ width: 200 }}
          />
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
           
  <ScoilLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
