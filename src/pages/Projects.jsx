import {
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import MUIDataTable from "mui-datatables";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Fab from "@mui/material/Fab";
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
import { Save, Print } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

/**Import css styles */
import "../assets/Projects.css";
/** import material icons */
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { FaEraser } from "react-icons/fa";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

function Projects() {
  const [etapa, setEtapa] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [descripcion, setDescription] = useState("");
  const [promotor, setPromotor] = useState("");
  const [address, setAddress] = useState("");
  const [monto, setMonto] = useState(0);
  const [open, setOpen] = useState(false);
  const [abonos, setAbonos] = useState(1);
  const [porcentaje, setPorcentaje] = useState(0);
  const [myArray, setMyArray] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [numDias, setNumDias] = useState();

  // Inicializa el estado con un array de tamaño n

  const [responsive, setResponsive] = useState("simple");
  // const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("100%");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

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
    setMonto(0);
    setDescription("");
  }
  function saveProject() {
    alert(proyecto + promotor + address + descripcion + monto + etapa);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
  
    GenerateData(abonos,monto);
                       
    setOpen(true);
  };

  /**Información de la tabla modal */
  const columnsPagos = [
    {
      name: "cuota",
      label: "Cuota",
    },
    {
      name: "date",
      label: "Fecha",
    },
    {
      name: "porcentaje",
      label: "%",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta, updateValue) => {
          const handleChange = (event) => {
            const id = tableMeta.rowData[1];
            //  handleOpen(id, "Pagos", tableMeta.rowData[3]);
          };

          return (
            <TextField
              variant="standard"
              type="number"
              value={porcentaje}
              InputProps={{
                inputProps: {
                  min: 0,
                  max: 100,
                },
              }}
              className="w-12"
              onChange={() => {
                setPorcentaje(event.target.value);
              }}
            />
          );
        },
      },
    },
    {
      name: "monto",
      label: "Monto",
    },
  ];

  /**Genera la tabla con el numero de abonos */
  function GenerateData(index,monto) {

    let resta = dayjs(fechaFin).diff(dayjs(fechaInicio), "days");
    if (resta > 0) {
      setNumDias(resta);
    }
  
    setPorcentaje(100 / index);



    let newData = [];

    let suma = 0;
    if (index > 1) {
      suma = Math.floor(numDias / (index - 1));
      
    } else {
      suma = 0;
     
    }
    for (let i = 1; i <= index; i++) {
     
      newData.push({
       
        cuota: i,
        date: dayjs(fechaInicio)
          .add(suma * (i - 1), "days")
          .format("YYYY-MM-DD"),
          monto: monto/index,
      });
    }

    return newData;
  }

  useEffect(() => {
    
    setMyArray(GenerateData(abonos,monto));
  }, [abonos,monto]);

  

  useEffect(() => {
  
    GenerateData(abonos,monto);
  }, [fechaInicio, fechaFin, abonos, monto]);

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: "No se encontraron coincidencias",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente",
        previous: "Atras",
        rowsPerPage: "Filas:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Limpiar filtros",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "Fila(s) seleccionadas",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
  };
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
                id="txtMonto"
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
                      <DatePicker
                        label="Fecha de inicio"
                        value={dayjs(fechaInicio)}
                        onChange={(date) => {
                          setFechaInicio(dayjs(date).format("YYYY-MM-DD"));
                          setFechaFin(
                            dayjs().add(1, "month").format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="es"
                    >
                      <DatePicker
                        label="Fecha de finalización"
                        value={dayjs(fechaFin)}
                        onChange={(date1) => {
                          setFechaFin(dayjs(date1).format("YYYY-MM-DD"));
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="grid row-span-1 border">
                    <h1 className="font-bold"> Forma de pago</h1>
                    <div className="grid grid-cols-3 gap-4">
                      <TextField
                        label="# de abonos"
                        variant="standard"
                        type="number"
                        id="txtAbonos"
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        value={abonos}
                        onChange={() => {
                          setAbonos(event.target.value);
                          setPorcentaje(100 / event.target.value);
                        }}
                      />
                      <button
                        className="col-span-2 text-green-600 flex gap-4 m-2"
                        onClick={() => {
                          //  setMyArray(GenerateData(abonos));
                          handleOpen();
                        }}
                      >
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

      <Modal open={open} onClose={handleClose}>
        <div className="modalProyectos  ">
          <div className="modalP overflow-auto">
            <MUIDataTable
              data={myArray}
              columns={columnsPagos}
              options={options}
            />
          </div>
          <Fab color="primary" aria-label="add">
            <Save />
          </Fab>
        </div>
      </Modal>
    </>
  );
}

export default Projects;
