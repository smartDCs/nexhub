import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { firebaseConfig } from "../firebase_config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [rol, setRol] = useState("");
  const options = ["Admin", "User"];
  const [value, setValue] = useState(options[0]);
  const [ruc, setRuc] = useState("");
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const infoUser = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        alert("Usuario " + name + ", creado con exito");
        return userCredential;
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
  //  console.log(infoUser.user.uid);
  // Guardamos los datos del usuario en otra coleccion
    const docuRef = doc(db, `usuarios/${infoUser.user.uid}`);
    setDoc(docuRef, {
      direccion: address,
      email: email,
      nombre_alias: name,
      rol: rol,
      telefono: phone,
      ci_ruc:ruc
    });
    // Creamos la coleccion de pagos correspondiente para este usuario
    const pagosRef = doc(db, `pagos/${infoUser.user.uid}`);
    setDoc(pagosRef,{beneficiario:'Administración del edificio',monto:'',concepto:'',fechaPago:'',estatus:""});
    navigate("/");
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
            required
          />
          {/**Sección dirección y teléfono */}
          <div className="mt-4 gap-4 flex justify-between">
            <input
              style={{ borderRadius: "5px", padding: "5px", width: "60%" }}
              type="text"
              name="nombre"
              placeholder="Dirección"
              onChange={() => {
                setAddress(event.target.value);
              }}
            />
            <input
              style={{ borderRadius: "5px", padding: "5px", width: "40%" }}
              type="text"
              name="nombre"
              placeholder="Teléfono"
              onChange={() => {
                setPhone(event.target.value);
              }}
            />
          </div>
          {/**sección RUC y Rol */}
          <div className="flex items-center mt-4 justify-between gap-4">
            <input
              style={{ borderRadius: "5px", padding: "5px", width: "50%" }}
              type="text"
              name="cedula"
              placeholder="CI./RUC"
              onChange={() => {
                setRuc(event.target.value);
              }}
            />
            {/**combo box para seleccionar el rol del usuario */}
            <Autocomplete
              value={value}
             
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={rol}
              onInputChange={(event, newInputValue) => {
                setRol(newInputValue);
              }}
              id="role"
              options={options}
              sx={{
                width: "50%",
               
              }}
              renderInput={(params) => (
                <TextField

                  {...params}
                variant="standard"
                size="small"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding:3
                  }}
                />
              )}
            />
          </div>
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
          <h2>
            Password
            <a style={{ fontSize: "8pt", fontStyle: "italic" }}>
              {" (Debe tener al menos 6 caracteres)"}
            </a>
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
            <button onClick={handleCreateAccount}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
