import { Card, CardContent } from "@mui/material";
import  { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { BsCashCoin } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//Importamos los context
import { UserContext } from "../context/User/UserContext";
// import material icons
import { Save, Print } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
//importamos la base de datos
import {getDocs,collection, query, where } from "firebase/firestore";

function Payments() {
 
//Declaramos los contextos que vamos a utilizar
const {userData,db}=useContext(UserContext);

const rol=userData.rol;
const userUid=userData.userUid;
  let navigate = useNavigate();
  const responsive="simple";
  const tableBodyHeight="400px";
  const tableBodyMaxHeight= "100%";
 

  const [porCobrar, setporCobrar] = useState(5342.23);
  const [porPagar, setporPagar] = useState(0);
  const [deuda, setDeuda] = useState();
  const [id, setId] = useState("");
  const [table, setTable] = useState("");
const [data,setData]=useState([]);
//const [pagosData,setPagosData]=useState(null);
  /**
   * variables para la ventana modal
   */

  const [open, setOpen] = useState(false);
  const handleOpen = (id, table, deuda) => {
    setId(id);
    setTable(table);
    setDeuda(deuda);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const options = {
    search: true,
    download: true,
    print: false,
    viewColumns:false,
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
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
  const columnsCobros = [
    {
      name: "payment",
      label: " ",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (value, tableMeta, updateValue) => {
          const handleChange = (event) => {
            const id = tableMeta.rowData[1];
            handleOpen(id, "Cobros", tableMeta.rowData[3]);
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
      name: "name",
      label: "Nombre",
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
            handleOpen(id, "Pagos", tableMeta.rowData[3]);
          };

          return (
            <button onClick={handleChange} className="btnPay">
              Pagar 
            </button>
          );
        },
        setCellProps: () => ({
          style: {with:"5%", margin: 0, padding: 0, },
        }),
      },
    },
    {
      name: "beneficiario",
      options: {
        setCellProps: () => ({
          style: { width: "30%", margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Beneficiario</div>;
        },
      },

    },
    {
      name: "date",
      options: {
        setCellProps: () => ({
          style: {
            width: "15%",
            fontSize: 11,
            margin: 0,
            padding: 0,
            textAlign: "center",
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Fecha</div>;
        },
      },
    },
    {
      name: "monto",
      options: {
        setCellProps: () => ({
          style: {
            width: "15%",
            backgroundColor: "rgba(255,180,50,0.6)",
            margin: 0,
            padding: 0,
            fontSize: 11,
            textAlign: "center",
          },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Monto $</div>;
        },
      },
    },
    {
      name: "concepto",
      options: {
        setCellProps: () => ({
          style: {
            width: "25%",

            margin: 0,
            padding: 0,
            fontSize: 11,
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Por concepto de</div>;
        },
      },
    },
  ];

 
  /**
   * Funcion que se encarga del tipo de pago
   */
  const [tipopago, setTipopago] = useState("");

  const formaPago = (event) => {
    setTipopago(event.target.name);
  };

  /**
   * Función para guardar en la DB los registros de cobros y pagos
   */
  function guardarPago() {
    alert("Guardando..");
    handleClose();
  }
  function PrintReport(event) {
    event.preventDefault();
    guardarPago();
    navigate("/report_payment");
  }
/**
 * Leemos la DB y obtenemos los pagos pendientes del usuario logueado
 * 
 */

const coleccion=query(collection(db,`/pagos/${userUid}/registros`),where("status","==","pendiente"));

  const getPagos=async()=>{
    const dataPagos=await getDocs(coleccion);
   
    const pagosData=dataPagos.docs.map((doc)=>({
      beneficiario: doc.data().beneficiario,
      monto: doc.data().monto,
      date: doc.data().fechaPago,
      concepto: doc.data().concepto,
    }));
  
   
    setData(pagosData);

  
  }
    
 
useEffect(()=>{
 getPagos();
 const suma=data.reduce((total,pago)=>total+parseFloat(pago.monto),0);

setporPagar(suma);


},[data]);



  return (
    <>
  {rol==="Admin"?
      <Card variant="elevation" className="m-4 ">
      <CardContent>
          <div>
            <div className="headerCardPayments bg-yellow-100 pl-5 pr-5">
              <h1>
                Cobros pendientes:
                <span>
                  <p className="text-green-600">${porCobrar}</p>{" "}
                </span>
              </h1>
              <NavLink to="/hcobros">
                <h2>Historico de cobros</h2>
              </NavLink>
            </div>

            <MUIDataTable
              data={data}
              columns={columnsCobros}
              options={options}
            />
          </div>
          </CardContent>
      </Card>
    :<></>}

{/**
Tabla de pagos pendientes
 */}

      <Card
      variant="elevation" 
      className="m-4 ">
      <CardContent>
      <div>
            <div className="headerCardPayments bg-yellow-50 pl-5 pr-5">
              <h1>
                Pagos pendientes:{" "}
                <span>
                  <p className="text-red-700">${porPagar}</p>{" "}
                </span>
              </h1>
              <NavLink to="/hpagos">
                <h2>Historico de pagos</h2>
              </NavLink>
            </div>
            <div>
          
            
              <MUIDataTable
                data={data}
                columns={columnsPagos}
                options={options}
              />
               
            </div>
          </div>
          </CardContent>
      </Card>

      {/** Ventana modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalPagos ">
          <form>
            <div className="flex m-4 justify-between">
              <h1 className=" font-bold text-orange-500">
                {table === "Pagos" ? "Registrar pagos" : "Registrar cobro"}
              </h1>

              {/**Muestra la fecha actual en el comprobante de pago */}
              <h1 className="font-bold">{dayjs().format("YYYY/MM/DD")}</h1>
            </div>

            <div className="grid grid-cols-7 gap-4 m-4">
              <h1 className="col-span-1">Nombre:</h1>
              <TextField
                value={id}
                variant="standard"
                disabled={true}
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-12 m-4 gap-4">
              <h1 className="col-span-2 ">
                {table === "Pagos" ? "Valor a pagar" : "Valor por cobrar"}:
              </h1>
              <TextField
                variant="standard"
                value={"$" + deuda}
                className="col-span-3  "
                InputProps={{
                  inputProps: {
                    style: {
                      color: "orangered",
                      fontWeight: "bolder",
                      fontFamily: "fantasy",
                      fontSize: "20pt",
                    },
                  },
                }}
              />
              {/**
               * Checkbox para seleccionar el tipo de pago
               */}
              <div className="col-span-7 bg-lime-200 rounded-lg shadow-md">
                <div className="grid grid-cols-7 m-6">
                  <FormControl component={"fieldset"} className="col-span-3 ">
                    <FormLabel component={"legend"}>Forma de Pago</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tipopago === "efectivo"}
                            onChange={formaPago}
                            name="efectivo"
                          />
                        }
                        label="Efectivo"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tipopago === "cheque"}
                            onChange={formaPago}
                            name="cheque"
                          />
                        }
                        label="Cheque"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tipopago === "transferencia"}
                            onChange={formaPago}
                            name="transferencia"
                          />
                        }
                        label="Transferencia"
                      />
                    </FormGroup>
                  </FormControl>
                  {/**
                   * Textfield para ingresar los datos del banco
                   */}
                  <div className="col-span-4">
                    <TextField
                      label="Banco"
                      variant="standard"
                      disabled={tipopago === "efectivo" ? true : false}
                    />
                    <TextField
                      label="# de documento"
                      variant="standard"
                      disabled={tipopago === "efectivo" ? true : false}
                    />
                    <TextField
                      label="Monto ($)"
                      variant="standard"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/** Botones de la ventana modal*/}
            <Stack direction="row" spacing={2}>
              <Tooltip title="Guardar" placement="top">
                <IconButton aria-label="save" color="primary" onClick={guardarPago}>
                  <Save />
                </IconButton>
              </Tooltip>
              <Tooltip title="Guardar e imprimir" placement="top">
                <IconButton aria-label="print" onClick={PrintReport}>
                  <Print color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Salir" placement="top">
                <IconButton aria-label="exit" onClick={handleClose}>
                  <CloseIcon color="error" />
                </IconButton>
              </Tooltip>
            </Stack>

       
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Payments;
