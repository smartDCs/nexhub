import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getAuth, connectAuthEmulator} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseEmulator } from "../../firebase_config";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import {getStorage,ref, uploadBytes,getDownloadURL,connectStorageEmulator} from 'firebase/storage'

const UserState = ({ children }) => {
  // Initialize Firebase
  
  
  const app = initializeApp(firebaseEmulator);
  const auth = getAuth(app);
  
  const db = getFirestore(app);
const storage=getStorage(app,'gs://nexhub-d92c0.appspot.com');
  const db1 = getDatabase(app);
 
  if (location.hostname === "localhost") {
  
    connectFirestoreEmulator(db, "localhost", 8080);
    connectDatabaseEmulator(db1, "127.0.0.1", 9000);
    connectStorageEmulator(storage,"127.0.0.1",9199);
  } 

  
 
 // const db = getFirestore(app);
  //const db = getDatabase(app);
  
  
  

  const [userData, setUserData] = useState({
    user: "",
    userUid: "",
    rol: "",
    ruc: "",
  });

  function userChange(userLogged) {
    setUserData(userLogged);
  }

  return (
    <UserContext.Provider value={{ userData, userChange, auth, db, app,storage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
