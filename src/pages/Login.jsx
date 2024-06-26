import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { auth, userChange, db } = useContext(UserContext);

  const handleSingIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      //  console.log('usuario ',user.uid);
   
        const docuRef = doc(db, `usuarios/${user.uid}`);
        
        getDoc(docuRef)
          .then((docuData) => {
            
            userChange({
              user: docuData.data().nombre_alias,
              rol: docuData.data().rol,
              userUid: user.uid,
              ruc: docuData.data().ci_ruc,
            });
            //console.log(userData);
          })
          .catch((error) => {
            console.log(error);
          });

        navigate("/dashboard");
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
    <>
      <div className="containerLogin ">
        <div className="login ">
          <form>
            <h1>Login</h1>
            <h2>Email</h2>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              onChange={() => {
                setEmail(event.target.value);
              }}
            />
            <h2>Password</h2>
            <input
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
                  <label> Olvidé mi contraseña</label>
                </NavLink>
              </p>
            </div>
          </form>

          <p>
            {" Welcome to Nexhub LIVING, if you don't have an account, please "}
            <NavLink to="/registerUser">
              <label>{" Register "}</label>
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
