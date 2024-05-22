import { Button, Card, CardContent, Modal, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import MUIDataTable from "mui-datatables";
import swal from 'sweetalert';
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { opciones } from "../components/TableSettings";
import { UserContext } from "../context/User/UserContext";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function BuildSettings() {
  const { storage, db } = useContext(UserContext);
  const [nombreEdificio, setNombreEdificio] = useState("Edificio ABC");

  const [direccion, setDireccion] = useState("Av. 123");
  const [fileImg, setFileImg] = useState();
  const options = ["Presidente", "Secretario", "Tesorero", "Vocal"];
  const optionsProyecto = ["Edifcio", "Conjunto residencial"];
  const [funcionAdministrativa, setFuncionAdministrativa] = useState(
    options[0]
  );
  const [numDep, setNumDep] = useState(0);
  const [numAlm, setNumAlm] = useState(0);
  const [numCasas, setNumCasas] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [valueProyecto, setValueProyecto] = useState(optionsProyecto[0]);
  const [editar, setEditar] = useState(true);
  const [inputValueP, setInputValueP] = useState("");

  const [nameAdministrativo, setNameAdministrativo] = useState("");
  const [emailAdministrativo, setEmailAdministrativo] = useState("");
  const [celular1, setCelular1] = useState("");
  const [celular2, setCelular2] = useState("");
  const [cedula, setCedula] = useState("");
  const [imagen, setImagen] = useState();
const [idAdmin,setIdAdmin]=useState('');
  const [otroComunal, setOtroComunal] = useState("");

  const [optionscheck, setOptionscheck] = useState([]);
  const [idEdificio, setIdEdificio] = useState("");
  let urlImg;
  let idEdif;
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "cedula",
      label: "CI.",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "celular1",
      label: "Teléfono 1",
    },
    {
      name: "celular2",
      label: "Teléfono 2",
    },
    {
      name: "rol",
      label: "Rol",
    },

    {
      name: "actions",
      label: " ",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          const handleEdit = () => {
           setIdAdmin(tableMeta.rowData[0]);
            setNameAdministrativo(tableMeta.rowData[1]);
            setCedula(tableMeta.rowData[2]);
            setEmailAdministrativo(tableMeta.rowData[3]);

            setCelular1(tableMeta.rowData[4]);
            setCelular2(tableMeta.rowData[5]);
            setFuncionAdministrativa(tableMeta.rowData[6]);
            setOpenAdministrativo(true);
          };
          const handleDelete = async () => {

            swal({
              title: "Estas seguro de querer eliminar a?",
              text: tableMeta.rowData[1],
              icon: "warning",
              buttons:{
                cancel:"Cancelar",
                ok:"Aceptar"
              },
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
               borrarAdministrativo(tableMeta.rowData[0]);
             
                swal("Eliminación exitosa!", {
                  icon: "success",
                  
                });
              } 
            });


          
          };
          return (
            <div className="flex justify-between">
              <button onClick={handleEdit} style={{ color: "rgb(10,100,180)" }}>
                <EditIcon />
              </button>
              <button
                onClick={handleDelete}
                style={{ color: "rgb(180,10,30)" }}
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          );
        },
        setCellProps: () => ({
          style: { with: "5%", margin: 0, padding: 0 },
        }),
      },
    },
  ];

  const [dataAdministrativos, setDataAdministrativos] = useState([]);
  
  /**
   * modal areas comunales
   */
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const CloseModal = () => setOpenModal(false);
  /**
   * modal administrativo
   */
  const [openAdministrativo, setOpenAdministrativo] = useState(false);
  const OpenAdministrativo = () => {
    setOpenAdministrativo(true);
  };
  const CloseAdministrativo = () => setOpenAdministrativo(false);

  const editarEdificio = () => {
    setEditar(false);
    //leemos la base de datos del edificio
    getEdificio();
  };

  /**
   * leemos los datos del edificio
   */
  const getEdificio = async () => {
    const coleccionEdificio = query(
      collection(db, "/edificio"),
      where("nombre", "==", nombreEdificio)
    );

    const edificios = await getDocs(coleccionEdificio);
    try {
      edificios.docs.map((doc) => {
        if (doc.data().nombre != null) {
          
          idEdif = doc.id;
          setDireccion(doc.data().direccion);
          setFileImg(doc.data().imagen);
          setValueProyecto(doc.data().tipo);
          setNumDep(doc.data().numDep);
          setNumAlm(doc.data().numAlm);

          setNumCasas(doc.data().numCasas);
          setOptionscheck(doc.data().areas);
          setIdEdificio(idEdif);
          leerAdministrativos(idEdif);
        } else {
           setIdEdificio("");
          idEdif = "";
          setDireccion("");
          setFileImg("");
          setValueProyecto("");
          setNumDep(0);
          setNumAlm(0);
          setDataAdministrativos([]);
          setNumCasas(0);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const leerAdministrativos = async (idEdificio) => {
    if (idEdificio !== "") {
      const coleccionAdministrativos = collection(
        db,
        `/edificio/${idEdificio}/administrativos`
      );
      const administrativos = await getDocs(coleccionAdministrativos);

      const datosA = administrativos.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().nombre,
        cedula: doc.data().cedula,
        email: doc.data().email,
        celular1: doc.data().celular1,
        celular2: doc.data().celular2,
        rol: doc.data().rol,
      }));
      setDataAdministrativos(datosA);
    }
  };
  const handleChange = (e) => {
    setFileImg(URL.createObjectURL(e.target.files[0]));

    setImagen(e.target.files[0]);
  };
  const handleSave = async (e) => {
    // subir a la db

    const refArchivo = ref(storage, `documentos/${nombreEdificio}.jpg`);
    await uploadBytes(refArchivo, imagen)
      .then(() => {
        console.log("subido");
      })
      .catch((error) => {
        console.log("error", error);
      });
    //
    //obtener la url de la imagen en la db

    urlImg = await getDownloadURL(refArchivo);

    const datosEdificio = {
      nombre: nombreEdificio,
      direccion: direccion,
      tipo: valueProyecto,
      numDep: numDep,
      numAlm: numAlm,
      numCasas: numCasas,
      imagen: urlImg,
      areas: optionscheck,
    };
    if (idEdificio === "") {
      // creo la coleccion para el edificio
      await addDoc(collection(db, "edificio"), { ...datosEdificio })
        .then((data) => {
          setIdEdificio(data.id);
        })
        .catch((error) => {
          swal(`Error al guardar ${error}`, {
            icon: "error",
          });
         
        });
    } else {
      // actualizo los datos del edificio
      const dbEdificio = doc(db, "edificio", idEdificio);
      await updateDoc(dbEdificio, datosEdificio)
        .then(() => {
          console.log("actualizado con exito");
        })
        .catch((error) => {
          console.log("no se pudo actualizar ", error);
        });
    }

    setEditar(true);
  };
  const handleAddOption = async () => {
    if (!optionscheck.some((option) => option.value === otroComunal)) {
      if (otroComunal !== "") {
        setOptionscheck([
          ...optionscheck,
          { value: otroComunal, label: otroComunal, selected: false },
        ]);
      } else {
        swal("Por favor ingrese un nombre válido!", {
          icon: "warning",
        });
      
      }
    } else {
      swal("El área ya se encuentra en la lista", {
        icon: "warning",
      });
      
     
    }

    setOtroComunal("");
  };
  const crearAdministrativo = async () => {
    const datosAdministrativo = {
      nombre: nameAdministrativo,
      email: emailAdministrativo,
      cedula: cedula,
      celular1: celular1,
      celular2: celular2,
      rol: funcionAdministrativa,
    };

    if(idAdmin===""){
      await addDoc(collection(db, `edificio/${idEdificio}/administrativos`), {
        ...datosAdministrativo,
      })
        .then(() => {
          swal("Guardado exitoso!", {
            icon: "success",
          });
          
        })
        .catch((error) => {
          swal(`Error al guardar ${error}`, {
            icon: "success",
          });
        
        });
    }else{
        // actualizo los datos del administrativo
        //console.log(idEdificio);
        const dbAdministrativo = doc(db, `edificio/${idEdificio}/administrativos`, idAdmin);
        await updateDoc(dbAdministrativo, datosAdministrativo)
          .then(() => {
            console.log("actualizado con exito");
            setIdAdmin("");
            CloseAdministrativo();
            
          })
          .catch((error) => {
            console.log("no se pudo actualizar ", error);
          });
    }
    leerAdministrativos(idEdificio);
    limpiarDatos();
  };
  const borrarAdministrativo= async (id)=>{
    const deletAdmin=doc(db,`edificio/${idEdificio}/administrativos`,id);
    await deleteDoc(deletAdmin);
    leerAdministrativos(idEdificio);
  }
  function limpiarDatos() {
    setNameAdministrativo("");
    setEmailAdministrativo("");
    setFuncionAdministrativa(options[0]);
    setCelular1("");
    setCelular2("");
    setCedula("");
  }

  useEffect(() => {
    try {
      getEdificio();
    } catch (error) {
      console.log("ERROR", error);
    }
  }, [nombreEdificio]);

  return (
    <>
      <Card className="m-4 mainCard">
        <CardContent>
          {/**
        Encabezado de la página
         */}
          <div className="grid grid-cols-4 ">
            <div className="col-span-3">
              <Typography variant="h5">{nombreEdificio}</Typography>
              <label style={{ fontSize: "0.7em" }}>
                <strong>Dirección: </strong>
                {direccion}
              </label>
            </div>
            <div className="col-span-1 logoEdificio  ">
              <img src={fileImg} width={"100px"} height={"100px"} />
              <div className="btnCLogo ">
                <label htmlFor="fileInput">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleChange}
                    disabled={editar}
                  />
                  <ImageSearchIcon />
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className="pb-6">
            <div className="flex justify-end">
              <Button onClick={editarEdificio}>Editar</Button>
              <Button onClick={handleSave}>Guardar</Button>
            </div>
            <div className="grid grid-cols-12 gap-4 ">
              <TextField
                variant="standard"
                label="Nombre del proyecto residencial"
                value={nombreEdificio}
                onChange={(e) => setNombreEdificio(e.target.value)}
                className="col-span-6 "
                disabled={editar}
              />
              <TextField
                variant="standard"
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="col-span-6"
                disabled={editar}
              />
            </div>
            <div className="grid grid-cols-12 gap-4 pt-2 ">
              <Autocomplete
                className="col-span-4"
                value={valueProyecto}
                onChange={(event, newValue) => {
                  setValueProyecto(newValue);
                }}
                inputValue={inputValueP}
                onInputChange={(event, newInputValue) => {
                  setInputValueP(newInputValue);
                }}
                options={optionsProyecto}
                size="small"
                disabled={editar}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tipo de proyecto"
                  />
                )}
              />
              <div className="col-span-8 ">
                <div className="grid grid-cols-8 gap-4 ">
                  {inputValueP === "Edifcio" ? (
                    <>
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Departamentos"
                        className="col-span-2"
                        size="small"
                        disabled={editar}
                        value={numDep}
                        onChange={(e) => setNumDep(e.target.value)}
                      />
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Almacenes"
                        className="col-span-2"
                        size="small"
                        disabled={editar}
                        value={numAlm}
                        onChange={(e) => setNumAlm(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <span className="col-span-2"></span>
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Casas"
                        className="col-span-2"
                        disabled={editar}
                        value={numCasas}
                        onChange={(e) => setNumCasas(e.target.value)}
                      />
                    </>
                  )}
                  <div className="col-span-4 flex justify-between">
                    <div className="grid grid-cols-3 lista">
                      <ul className="col-span-2 " disabled={editar}>
                        {optionscheck.map((dato, index) =>
                          dato.selected === true ? (
                            <li key={index}>
                              <label>{dato.value}</label>
                            </li>
                          ) : null
                        )}
                      </ul>
                      <Button
                        onClick={handleOpen}
                        className="col-span-1"
                        disabled={editar}
                      >
                        Áreas comunales
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={OpenAdministrativo}>
              <AddIcon />
              Agregar
            </Button>
          </div>

          <div className="col-span-8">
            <MUIDataTable
              title={"Miembros de la junta administrativa"}
              data={dataAdministrativos}
              columns={columns}
              options={opciones("Junta administrativa", "200px", "100%")}
            />
          </div>
        </CardContent>
      </Card>

      <Modal open={openModal} onClose={CloseModal}>
        <div className=" modalComunales">
          <h1 className="pb-4">
            <strong>Seleccione las áreas comunales disponibles</strong>
          </h1>
          <ul className="grid grid-cols-12 gap-2 m-2">
            {optionscheck.map((item, index) => {
              return (
                <li key={index} className="col-span-4">
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={item.selected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOptionscheck((anterior) =>
                          anterior.map((option) =>
                            option.value === e.target.value
                              ? { ...option, selected: true }
                              : option
                          )
                        );
                      } else {
                        setOptionscheck((anterior) =>
                          anterior.map((option) =>
                            option.value === e.target.value
                              ? { ...option, selected: false }
                              : option
                          )
                        );
                      }
                    }}
                  />
                  <label> {item.label}</label>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-start align-bottom m-4">
            <TextField
              variant="standard"
              size="small"
              label="Agregar otro"
              value={otroComunal}
              onChange={(e) => setOtroComunal(e.target.value)}
            />
            <button style={{color:"rgb(255,255,255)",width:"1.5rem",height:"1.5rem", backgroundColor:"rgba(50,205,50,0.5", borderRadius:"5%"}} onClick={handleAddOption}>
              <AddIcon />
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={openAdministrativo} onClose={CloseAdministrativo}>
        <Card variant="elevation" className=" modalComunales">
          <CardContent>
            <div >
              <h1>
                <strong>AGREGAR MIEMBRO DE LA JUNTA ADMINISTRATIVA</strong>
              </h1>
              <div className="grid grid-cols-12 gap-2">
                <TextField
                  label="Nombres y Apellidos"
                  variant="standard"
                  className="col-span-6"
                  required
                  value={nameAdministrativo}
                  onChange={(e) => setNameAdministrativo(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  className="col-span-6 "
                  value={emailAdministrativo}
                  onChange={(e) => setEmailAdministrativo(e.target.value)}
                />
                <TextField
                  label="CI.:"
                  variant="standard"
                  className=" col-span-3"
                  required
                  size="small"
                  type="number"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                <TextField
                  label="Celular 1"
                  variant="standard"
                  className=" col-span-3"
                  required
                  size="small"
                  type="number"
                  value={celular1}
                  onChange={(e) => setCelular1(e.target.value)}
                />
                <TextField
                  label="Celular 2"
                  variant="standard"
                  className=" col-span-3"
                  size="small"
                  type="number"
                  value={celular2}
                  onChange={(e) => setCelular2(e.target.value)}
                />
                <Autocomplete
                  value={funcionAdministrativa}
                  onChange={(event, newValue) => {
                    setFuncionAdministrativa(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  className="col-span-3"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Función"
                      size="small"
                      variant="standard"
                    />
                  )}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              {" "}
              <button
                className="bg-green-600 text-white m-4 btnGuardar col-span-3"
                onClick={crearAdministrativo}
              >
                Guardar
              </button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default BuildSettings;
