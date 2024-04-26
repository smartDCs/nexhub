import {
  getAuth,
  
  sendPasswordResetEmail,
 
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase_config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleResetPassword = (event) => {
    event.preventDefault();

    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Se ha enviado un correo para restablecer la contraseña.");
      navigate('/');
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage)
      // ..
    });
  };

  return (
    <div className="containerLogin ">
      <div className="login ">
        <form>
          <h1>Reset password</h1>
          
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
       
          <div className="buttonContainer">
            <button onClick={handleResetPassword}>Enviar correo</button>
          </div>
         
        </form>

        <p>
        Si experimenta algún problema, no dude en ponerse en contacto con el administrador del sistema.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
