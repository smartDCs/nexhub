import React, { useState } from 'react'
import { UserContext } from './UserContext'
const UserState=({ children })=>{
const  [currentUser, setCurrentUser] = useState("");

function userChange(user){
setCurrentUser(user);
}


    return(
       <UserContext.Provider
       value={{currentUser,userChange}}
       >
        {children}
       </UserContext.Provider>
    )
}

export default UserState