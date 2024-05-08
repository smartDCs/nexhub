import { Button, Card, CardContent, Modal, Tooltip } from "@mui/material";
import  { useState } from "react";
import TextField from "@mui/material/TextField";
import BadgeIcon from "@mui/icons-material/Badge";
import MUIDataTable from "mui-datatables";
import { opciones } from "../components/TableSettings";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ApartmentIcon from "@mui/icons-material/Apartment";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PrintIcon from "@mui/icons-material/Print";
import { AiOutlineClear } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import SpeedIcon from "@mui/icons-material/Speed";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


function Neighbors() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState();
  const [oficina, setOficina] = useState("");
  const [alicuota, setAlicuota] = useState();
 
  const [cedula, setCedula] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (rowData) => {
    setNombre(rowData[0]);
    setEmail(rowData[1]);
    setCedula(rowData[2]);
    setTelefono(rowData[3]);
    setOficina(rowData[4]);
    setAlicuota(rowData[6]);

    
    setOpen(true);
  };
  const handleClose = () =>{
    limpiar();
    setOpen(false);
  }

  const columns = [
    {
      name: "name",

      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "150px" }} className="encabezadoTabla">
              NOMBRE
            </div>
          );
        },
      },
    },
    {
      name: "email",

      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "150px" }} className="encabezadoTabla">
              EMAIL
            </div>
          );
        },
      },
    },
    {
      name: "ci",

      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "50px" }} className="encabezadoTabla">
              CI.
            </div>
          );
        },
      },
    },
    {
      name: "telefono",

      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "50px" }} className="encabezadoTabla">
              TELÉFONO
            </div>
          );
        },
      },
    },
    {
      name: "propiedad",

      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "140px" }} className="encabezadoTabla">
              OFICINA/DEPARTAMENTO
            </div>
          );
        },
      },
    },
   
    {
      name: "alicuota",

      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: "0 10px", fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "60px" }} className="encabezadoTabla">
              % ALÍCUTA{" "}
            </div>
          );
        },
      },
    },
    {
      name: "editar",
     
      options: {
        filter: false,
        sort: false,
     
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla ">EDICIÓN</div>;
        },
        customBodyRender: (value, tableMeta) => {
          const handleEditar = () => {
            //const id = tableMeta.rowData[0];
            handleOpen(tableMeta.rowData);
            // alert("Editar"+id+ "Pagos"+ tableMeta.rowData[3]);
          };
          const handleEliminar = () => {
            const id = tableMeta.rowData[0];
            alert("Eliminar" + id + "Pagos" + tableMeta.rowData[3]);
          };

          return (
            <div style={{ width: "50px" }}>
              <Tooltip title="Editar">
                <EditIcon onClick={handleEditar} className="text-blue-600" />
              </Tooltip>
              <Tooltip title="Eliminar">
                <DeleteOutlineIcon
                  onClick={handleEliminar}
                  className="text-red-600"
                />
              </Tooltip>
            </div>
          );
        },
        setCellProps: () => ({
          style: {
            with: "20px",
            margin: 0,
            padding: 0,
            fontSize: 11,
            display: "flex",
            justifyContent: "center",
          },
        }),
      },
    },
  ];

  const data = [
    {
      name: "Joe Jhonson James",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "John Walsh",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "Bob Herm",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
     
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
     
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
   
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
     
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
    {
      name: "James Houston",
      email: "ejemplo@ejemplo.com",
      ci: "1234567890",
      telefono: "0987654321",
    
      propiedad: "Departamento 101",
      alicuota: "12.03",
    },
  ];

  /**
   * Agrega el copropietario a la base de datos
   */
  function guardar() {
    event.preventDefault();

    if (
      !nombre ||
      !telefono ||
      !cedula ||
      !oficina ||
      !alicuota 
    ) {
      alert("Por favor ingrese todos los datos requeridos");
    } else {
      alert(nombre + "\n" + email + "\n" + telefono + "\n" + cedula);
    }
  }
  function limpiar() {
    event.preventDefault();
    setNombre("");
    setCedula("");
    setEmail("");
    setTelefono("");
    setOficina("");
    setAlicuota("");
   
  }

  /**
   * Editar los datos del copropietario
   */
  function editar(){
alert("Guardado correctamente");
handleClose();
  }



  
  return (
    <>
      <Card variant="outlined" className="m-6 mainCard">
        <CardContent className="m-1">
          <div>
            <form className="formNeighbor p-4">
              <h1>AGREGAR COPROPIETARIO</h1>
              <div className="grid grid-cols-12 gap-4">
                <TextField
                  variant="standard"
                  required
                  label={
                    <label>
                      <PersonIcon className="text-green-800" /> Nombre
                    </label>
                  }
                  type="text"
                  className="grid col-span-5"
                  onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                  variant="standard"
                  label={
                    <label>
                      <EmailIcon className="text-orange-400" /> Email
                    </label>
                  }
                  type="email"
                  className="grid col-span-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="standard"
                  required
                  label={
                    <label>
                      <BadgeIcon className="text-blue-800" /> CI.:{" "}
                    </label>
                  }
                  type="number"
                  className="grid col-span-3"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-12 gap-4 pt-4">
                <TextField
                  variant="standard"
                  required
                  label={
                    <label>
                      <CorporateFareIcon className="text-green-800" />{" "}
                      Oficina/Depto.
                    </label>
                  }
                  className="grid col-span-3"
                  value={oficina}
                  onChange={(e) => setOficina(e.target.value)}
                />
                <TextField
                  variant="standard"
                  type="number"
                  required
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 100,
                      step: 0.01,
                    },
                  }}
                  label={
                    <label>
                      <ApartmentIcon className="text-green-800" /> % Alícuotas
                    </label>
                  }
                  className="grid col-span-3"
                  value={alicuota}
                  onChange={(e) => setAlicuota(e.target.value)}
                />
               
                <TextField
                  variant="standard"
                  type="number"
                  required
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  label={
                    <label>
                      <WhatsAppIcon className="text-green-800" /> Teléfono
                    </label>
                  }
                  className="grid col-span-3"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
              <div className="pt-4 gap-4 flex justify-end">
                <Button variant="text" style={{ color: "rgb(100,100,100)" }}>
                  <PrintIcon />
                  Imprimir lista
                </Button>
                <Button
                  variant="text"
                  style={{ color: "rgb(100,100,100)" }}
                  onClick={() => {
                    limpiar();
                  }}
                >
                  <AiOutlineClear style={{ fontSize: "18pt" }} />
                  Limpiar
                </Button>
                <Button
                  variant="text"
                  style={{ color: "rgb(100,100,100)" }}
                  onClick={() => {
                    guardar();
                  }}
                >
                  <AddIcon />
                  Agregar
                </Button>
              </div>
            </form>
          </div>
          <div className="  col-span-8">
            <MUIDataTable
              title={"Copropietarios"}
              data={data}
              columns={columns}
              options={opciones("Lista de copropietarios", "200px", "100%")}
            />
          </div>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalPagos">
          <form className="formNeighbor p-4">
            <h1>AGREGAR COPROPIETARIO</h1>
            <div className="grid grid-cols-12 gap-4">
              <TextField
                variant="standard"
                required
                label={
                  <label>
                    <PersonIcon className="text-green-800" /> Nombre
                  </label>
                }
                type="text"
                className="grid col-span-5"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled
              />
              <TextField
                variant="standard"
                label={
                  <label>
                    <EmailIcon className="text-orange-400" /> Email
                  </label>
                }
                type="email"
                className="grid col-span-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="standard"
                required
                label={
                  <label>
                    <BadgeIcon className="text-blue-800" /> CI.:{" "}
                  </label>
                }
                type="number"
                className="grid col-span-3"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                disabled
              />
            </div>
            <div className="grid grid-cols-12 gap-4 pt-4">
              <TextField
                variant="standard"
                required
                label={
                  <label>
                    <CorporateFareIcon className="text-green-800" />{" "}
                    Oficina/Depto.
                  </label>
                }
                className="grid col-span-3"
                value={oficina}
                onChange={(e) => setOficina(e.target.value)}
              />
              <TextField
                variant="standard"
                type="number"
                required
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: 100,
                    step: 0.01,
                  },
                }}
                label={
                  <label>
                    <ApartmentIcon className="text-green-800" /> % Alícuotas
                  </label>
                }
                className="grid col-span-3"
                value={alicuota}
                onChange={(e) => setAlicuota(e.target.value)}
              />
              

              <TextField
                variant="standard"
                type="number"
                required
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                label={
                  <label>
                    <WhatsAppIcon className="text-green-800" /> Teléfono
                  </label>
                }
                className="grid col-span-3"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="pt-4 gap-4 flex justify-end">
              <Button variant="text" style={{ color: "rgb(100,100,100)" }}
              onClick={()=>editar()}
              >
                <SaveIcon />
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Neighbors;
