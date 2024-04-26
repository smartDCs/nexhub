import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase_config";
import { useState } from "react";
import { NavLink } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  /*
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
  */
  const handleSingIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Acceso correcto, bienvenido: ");
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/too-many-requests":
            alert(
              "Se ha excedido la cantidad de intentos de inicio de sesión permitidos. Por favor, inténtelo nuevamente más tarde"
            );
            break;
          case "auth/invalid-credential":
            alert("Email o contraseña inválido, por favor intente nuevamente");
            break;
          case "auth/wrong-password":
            alert("Contraseña incorrecta");
            break;
          case "auth/user-not-found":
            alert("Usuario no encontrado.");
            break;
          default:
            alert(
              "No se puede iniciar sesión, por favor contactese con el administrador del sistema"
            );
        }

        console.log(error.message);
      });
  };

  return (
    <div className="containerLogin ">
      <div className="login ">
        <form>
          <h1>Login</h1>
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
          <h2>Password</h2>
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
            <button onClick={handleSingIn}>Login</button>
          </div>
          <div
            style={{
              justifyContent: "right",
              display: "flex",
              marginTop: "5px",
              
              fontStyle: "italic",
              fontSize: "8pt",
            }}
          >
          <p>
          <NavLink to="/resetPassword">
          <a >Olvidé mi contraseña</a>
          </NavLink>
           
            </p>
          </div>
        </form>

        <p>
          Welcome to Nexhub LIVING, if you don't have an account, please{" "}
          <NavLink to="/registerUser">
          <a >
            {" "}
            Register
          </a>
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
