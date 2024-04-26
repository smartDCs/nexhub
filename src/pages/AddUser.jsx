import {
  getAuth,
  createUserWithEmailAndPassword,

} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase_config";
import { useState } from "react";
import { NavLink } from "react-router-dom";
function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);

        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            alert("La contraseña debe contener al menos 6 caracteres");
            break;
          case "auth/email-already-in-use":
            alert("El usuario " + email + " ya existe");
            break;

          default:
            alert(
              "No se puede crear  el usuario con estos datos. Por favor contactese con el  administrador del sistema."
            );
            console.log(error.message);
        }
        // ..
      });
  };
 
  return (
    <div className="containerLogin ">
      <div className="login ">
        <form>
          <h1>Registrar</h1>
          <h2>Usuario</h2>
          <input
            style={{ borderRadius: "5px", padding: "5px" }}
            type="text"
            name="nombre"
            placeholder="Nombre de usuario"
            onChange={() => {
              setName(event.target.value);
            }}
          />
          <h2>Email</h2>
          <input
            style={{ borderRadius: "5px", padding: "5px" }}
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            onChange={() => {
              setEmail(event.target.value);
            }}
          />
          <h2>Password
          <h3 style={{fontSize:'8pt', fontStyle:'italic'}}>{"(Debe tener al menos 6 caracteres)"}</h3>
          </h2>
         
          <input
            style={{ borderRadius: "5px", padding: "5px" }}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={() => {
              setPassword(event.target.value);
            }}
          />
          <div className="buttonContainer">
            <button >Registrar</button>
          </div>
         
        </form>

      
      </div>
    </div>
  );
}

export default AddUser;
