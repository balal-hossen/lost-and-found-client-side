import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase.config";
import axios from "axios";
import { Authcontex } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Register
  const create = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Email Signin
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Logout
  const signout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      })
      .finally(() => setLoading(false));
  };

  // ✅ Google Login
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Track user + send JWT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser && currentUser.email) {
        axios
          .post(
            "http://localhost:5000/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          )
          .then((res) => console.log("JWT issued ✅"))
          .catch((err) => console.error("JWT error:", err));
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
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
