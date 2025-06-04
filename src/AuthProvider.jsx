import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { Authcontex } from './AuthContext';
import { auth } from './firebase.config';


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

    /*  if(currentUSer?.email){
        const userData={email:currentUSer.email}
        axios.post('http://localhost:5000/jwt',userData)
        .then(res=>{
            console.log('token after jwt',res.data)
const token=res.data.token;;
localStorage.setItem('token', token)
        })
        .catch(err=>{
            console.log(err)
        })
     } */
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
