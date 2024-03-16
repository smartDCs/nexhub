import {
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import MUIDataTable from "mui-datatables";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers";
import Modal from "@mui/material/Modal";
//import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
/**Import material icons */
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FoundationIcon from "@mui/icons-material/Foundation";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsCashCoin } from "react-icons/bs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

/**Import css styles */
import "../assets/Projects.css";
/** import material icons */
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Save } from "@mui/icons-material";
import { FaEraser } from "react-icons/fa";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";



function Projects() {
 
  const [etapa, setEtapa] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [descripcion, setDescription] = useState("");
  const [promotor, setPromotor] = useState("");
  const [address, setAddress] = useState("");
  const [monto, setMonto] = useState(0);
  const [open,setOpen]=useState(false);
  /**project variables */
  let openProjects = 34;
  let totalDesigns = 12;
  let totalConstruction = 22;
  let closedProjects = 14;
  let totalDesignsend = 10;
  let totalConstructionend = 4;
  const etapaActual = (event) => {
    setEtapa(event.target.name);
  };
  function viewDesignProject() {
    alert("mostrar los proyectos de diseño");
  }
  function viewConstructionProject() {
    alert("mostrar los proyectos en construcción");
  }
  function viewDesignProjectend() {
    alert("mostrar los proyectos de diseñados");
  }
  function viewConstructionProjectend() {
    alert("mostrar los proyectos construidos");
  }
  function paymentMethod() {
    alert("abre ventana modal para ingresar la forma de pago");
  }
  function clearForm() {
    setEtapa("");
    setPromotor("");
    setProyecto("");
    setAddress("");
    setMonto("");
    setDescription("");
  }
  function saveProject() {
    alert(proyecto + promotor + address + descripcion + monto + etapa);
  }

const handleClose=()=>{
  setOpen(false)
}
const handleOpen=()=>{
  setOpen(true);
}

/**Información de la tabla modal */
const columnsPagos = [
  {
    name: "payment",
    label: " ",
    options: {
      filter: true,
      sort: true,

      customBodyRender: (value, tableMeta, updateValue) => {
        const handleChange = (event) => {
          const id = tableMeta.rowData[1];
        //  handleOpen(id, "Pagos", tableMeta.rowData[3]);
        };

        return (
          <button onClick={handleChange} className="btnPay">
            {" "}
            Pagar &nbsp;
            <BsCashCoin className=" size-10 pt-0 pl-2 pb-4" />
          </button>
        );
      },
    },
  },
  {
    name: "cuota",
    label: "Cuota",
  },
  {
    name: "date",
    label: "Fecha",
  },
  {
    name: "monto",
    label: "Monto",
  },
];
const data = [
  {
    cuota: "1",
    date: "2024/02/03",
    monto: "34.5",
  },
  {
    cuota: "2",
    date: "2024/02/03",
    monto: "1235",
  },
  { cuota: "3", date: "2024/02/03", monto: "1234.5" },
  {
    cuota: "4",
    date: "2024/02/03",
    monto: "870",
  },
  { cuota: "5", date: "2024/02/03", monto: "1234.5" },
  {
    cuota: "6",
    date: "2024/02/03",
    monto: "1234.5",
  },
  { cuota: "7", date: "2024/02/03", monto: "1234.5" },
  {
    cuota: "8",
    date: "2024/02/03",
    monto: "1234.5",
  },
];
  return (
    <>
      <div className="grid grid-cols-2 gap-4 ml-9 mr-9 mb-0 mt-5">
        <Card variant="elevation">
          <CardContent className="projectCard">
            <h1>Proyectos abiertos</h1>
            <h2>
              {openProjects} <HomeWorkIcon />
            </h2>
          </CardContent>
          <CardActions>
            <Tooltip title="Diseños" placement="top">
              <IconButton
                aria-label="save"
                color="primary"
                onClick={viewDesignProject}
              >
                <h1>
                  {totalDesigns}
                  <DesignServicesIcon />
                </h1>
              </IconButton>
            </Tooltip>
            <Tooltip title="Construcción" placement="top">
              <IconButton
                aria-label="save"
                color="success"
                onClick={viewConstructionProject}
              >
                <h1>
                  {totalConstruction}
                  <FoundationIcon />
                </h1>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>

        <Card variant="elevation">
          <CardContent className="projectCard">
            <h1>Proyectos Terminados</h1>
            <h2>
              {closedProjects} <HomeWorkIcon />
            </h2>
          </CardContent>
          <CardActions>
            <Tooltip title="Diseños" placement="top">
              <IconButton
                aria-label="save"
                color="primary"
                onClick={viewDesignProjectend}
              >
                <h1>
                  {totalDesignsend}
                  <DesignServicesIcon />
                </h1>
              </IconButton>
            </Tooltip>
            <Tooltip title="Construcción" placement="top">
              <IconButton
                aria-label="save"
                color="success"
                onClick={viewConstructionProjectend}
              >
                <h1>
                  {totalConstructionend}
                  <FoundationIcon />
                </h1>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </div>
      <div className="grid grid-cols-1 ml-9 mr-9 mb-9 mt-2">
        <Card variant="elevation">
          <CardContent>
            <h1 className="font-bold">Crear Proyecto</h1>
            <div className="grid grid-cols-2 gap-10 mt-2 ml-4 mr-4">
              <TextField
                variant="standard"
                label="Nombre del proyecto"
                value={proyecto}
                onChange={() => {
                  setProyecto(event.target.value);
                }}
              />
              <TextField
                label="Promotor"
                variant="standard"
                value={promotor}
                onChange={() => {
                  setPromotor(event.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-10 m-4">
              <TextField
                label="Ubicación"
                variant="standard"
                value={address}
                onChange={() => {
                  setAddress(event.target.value);
                }}
              />
              <TextField
                label="Monto del proyecto ($)"
                variant="standard"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={monto}
                onChange={() => {
                  setMonto(event.target.value);
                }}
              />

              <FormControl component={"fieldset"} className="grid col-span-1">
                <FormLabel component={"legend"}>Etapa del proyecto</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={etapa === "design"}
                        onChange={etapaActual}
                        name="design"
                      />
                    }
                    label="Diseño"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={etapa === "construccion"}
                        onChange={etapaActual}
                        name="construccion"
                      />
                    }
                    label="Construcción"
                  />
                </FormGroup>
              </FormControl>
            </div>

            <div className="grid grid-cols-2 gap-2 m-4">
              <textarea
                className="col-span-1 h-28 bg-yellow-100"
                placeholder="Descripción y/o alcances del proyecto"
                value={descripcion}
                onChange={() => {
                  setDescription(event.target.value);
                }}
              ></textarea>

              <div className="ml-9 grid grid-cols-1 gap-1">
                <div className="grid grid-rows-2">
                  <div className="grid grid-cols-2 gap-1 row-span-1">
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="es"
                    >
                      <DatePicker label="Fecha de inicio" />
                    </LocalizationProvider>

                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="es"
                    >
                      <DatePicker label="Fecha de finalización" />
                    </LocalizationProvider>
                  </div>
                  <div className="grid row-span-1 border">
                    <h1 className="font-bold"> Forma de pago</h1>
                    <div className="grid grid-cols-3 gap-4">
                      <TextField
                        label="# de abonos"
                        variant="standard"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={monto}
                        onChange={() => {
                          setMonto(event.target.value);
                        }}
                      />
                      <button className="col-span-2 text-green-600 flex gap-4 m-2" onClick={()=>{
                        handleOpen();
                      }}>
                      Ver tabla <LiaFileInvoiceDollarSolid />
                      </button>
               
                
                 
               
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Stack direction="row" spacing={2} className="justify-end">
              <Tooltip title="Guardar" placement="top-end">
                <IconButton
                  aria-label="save"
                  color="primary"
                  onClick={saveProject}
                >
                  <Save className="saveIcon" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Limpiar datos" placement="top-end">
                <IconButton aria-label="save" color="error" onClick={clearForm}>
                  <FaEraser className="saveIcon" />
                </IconButton>
              </Tooltip>
            </Stack>
          </CardContent>
        </Card>
      </div>

{/**
 * Ventana modal que muestra la tabla de pagos geerada
 */}

<Modal
open={open}
onClose={handleClose}

>
<div className="modalProyectos">
<MUIDataTable
data={data}
columns={columnsPagos}

/>
</div>



</Modal>



    </>
  );
}

export default Projects;
