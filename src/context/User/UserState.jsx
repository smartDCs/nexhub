import { useState } from 'react'
import { UserContext } from './UserContext';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase_config";
const UserState=({children})=>{
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
const  [currentUser, setCurrentUser] = useState("");

function userChange(user){
setCurrentUser(user);
}


    return(
       <UserContext.Provider
       value={{currentUser,userChange, auth}}
       >
        {children}
       </UserContext.Provider>
    )
}

export default UserState