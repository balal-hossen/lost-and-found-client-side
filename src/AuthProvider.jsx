import React, { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from './firebase.config';
import axios from 'axios';
import { Authcontex } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const create = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser && currentUser.email) {
        axios.post('https://lost-and-found-hazel.vercel.app/jwt', { email: currentUser.email }, { withCredentials: true })
          .then(res => console.log('JWT set!', res))
          .catch(err => console.error('JWT error:', err));
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    create,
    signin,
    signout,
    signInWithGoogle,
  };

  return (
    <Authcontex.Provider value={userInfo}>
      {children}
    </Authcontex.Provider>
  );
};

export default AuthProvider;
