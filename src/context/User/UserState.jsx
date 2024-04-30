import { useState } from 'react'
import { UserContext } from './UserContext';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase_config";
const UserState=({children})=>{
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const  [userData,setUserData]=useState({user:"",userUid:"",rol:"",ruc:""});


function userChange(userLogged){
setUserData(userLogged);
}


    return(
       <UserContext.Provider
       value={{userData,userChange, auth}}
       >
        {children}
       </UserContext.Provider>
    )
}

export default UserState