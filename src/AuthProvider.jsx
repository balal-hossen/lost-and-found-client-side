import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { Authcontex } from './AuthContext';
import { auth } from './firebase.config';
import axios from 'axios';


const AuthProvider = ({children}) => {


const [loading,setLoading]=useState(true)//atar kaj hosce privet routes set korar jonno
const [user,setUser]=useState(null)

const create=(email,password)=>{
    setLoading(true) 
    return createUserWithEmailAndPassword(auth,email,password)///regiseter
}
const signin=(email,password)=>{
     setLoading(true) 
    return signInWithEmailAndPassword(auth,email,password)
}

const signout=()=>{
    setLoading(true) 
    return signOut(auth)
}

 useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth,currentUSer=>{
        console.log('current User site useEffet on auth state chang',currentUSer)//user handle korar jonno mane refreashdileo jeno user na jay chole
        setUser(currentUSer)
        
        
     
       setLoading(false) 
     /////////////💞💞💞💞💞💞jwt  token releted api💞💞💞💞💞///////////

     if (currentUSer && currentUSer.email) {
        axios.post('http://localhost:5000/jwt', { email: currentUSer.email }, { withCredentials: true })
       .then(res=> {
        console.log('JWT set!',res);
         })
        .catch(err => {
         console.error('JWT error:', err);
        });
     }
     /////////💞💞💞💞💞💞jwt  token releted api💞💞💞💞💞///////////

     
    })
    return ()=>{
        unSubscribe();
    }
},[]) 


const userIng={
   user,
   setUser,
 
   loading,
    create,
    signin,
    signout
}
    return (
        <Authcontex value={userIng}>
            {children}
        </Authcontex>
    );
};

export default AuthProvider;
