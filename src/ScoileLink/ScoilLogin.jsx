import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';

import Swal from 'sweetalert2';
import { Authcontex } from '../AuthContext';

const ScoilLogin = () => {
  const { signInWithGoogle } = useContext(Authcontex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get('redirect') || '/';

  const signInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire('Login Successful!', 'Welcome back!', 'success');
        navigate(from, { replace: true });
      })
     /*  .catch((error) => {
        Swal.fire('Login Failed', error.message, 'error');
      }); */
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={signInGoogle}
        className="btn bg-white ml-10 text-black border-[#e5e5e5]"
      >
        {/* Google logo svg এখানে থাকবে */}
        Login with Google
      </button>
    </div>
  );
};

export default ScoilLogin;
