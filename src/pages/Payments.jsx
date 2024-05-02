import { Card, CardContent } from "@mui/material";
import { useState, useContext, useEffect } from "react";
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
import { getDocs, collection, query, where } from "firebase/firestore";
import { opciones } from "../components/TableSettings";
function Payments() {
  //Declaramos los contextos que vamos a utilizar
  const { userData, db } = useContext(UserContext);

  const rol = userData.rol;
  const userUid = userData.userUid;
  let navigate = useNavigate();


  const [porCobrar, setporCobrar] = useState(0);
  const [porPagar, setporPagar] = useState(0);
  const [deuda, setDeuda] = useState();
  const [id, setId] = useState("");
  const [table, setTable] = useState("");
  const [data, setData] = useState([]);
const [dataCobros,setDataCobros]=useState([]);
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
            handleOpen(id, "Pagos", tableMeta.rowData[3]);
          };

          return (
            <button onClick={handleChange} className="btnPay">
              Pagar
            </button>
          );
        },
        setCellProps: () => ({
          style: { with: "5%", margin: 0, padding: 0 },
        }),
      },
    },
    {
      name: "deudor",
      options: {
        setCellProps: () => ({
          style: { width: "30%", margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Deudor</div>;
        },
      },
    },
    {
      name: "date",
      options: {
        setCellProps: () => ({
          style: {
            width: "20%",
            fontSize: 11,
            margin: 0,
            padding: 0,
            textAlign: "center",
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Fecha máxima de cobro</div>;
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
          style: { with: "5%", margin: 0, padding: 0 },
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
            width: "20%",
            fontSize: 11,
            margin: 0,
            padding: 0,
            textAlign: "center",
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Fecha máxima de pago</div>;
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


const coleccionPagos=query(collection(db,`/pagos/${userUid}/registros`),where("status","==","pendiente"));

  const getPagos=async()=>{
    const dataPagos=await getDocs(coleccionPagos);
   
    const pagosData=dataPagos.docs.map((doc)=>({
      beneficiario: doc.data().beneficiario,
      monto: doc.data().monto,
      date: doc.data().fechaPago,
      concepto: doc.data().concepto,
    }));
  
   
    setData(pagosData);

  
  }
    
 
const coleccionCobros=query(collection(db,`/cobros/${userUid}/registros`),where("status","==","pendiente"));

  const getCobros=async()=>{
    const dataCobros=await getDocs(coleccionCobros);
   
    const cobrosData=dataCobros.docs.map((doc)=>({
      deudor: doc.data().deudor,
      monto: doc.data().monto,
      date: doc.data().fechaCobro,
      concepto: doc.data().concepto,
    }));
  
   
    setDataCobros(cobrosData);

  
  }
    
  useEffect(() => {
    getPagos();
    getCobros();
    const suma = data.reduce(
      (total, pago) => total + parseFloat(pago.monto),
      0
    );

    setporPagar(suma);
   
    
  
  const suma1 = dataCobros.reduce(
    (total, pago) => total + parseFloat(pago.monto),
    0
  );

  setporCobrar(suma1);

  }, [data]);

  return (
    <>

      {rol === "User" ? (
        <Card variant="elevation" className="m-4 ">
          <CardContent>
            <div>
              <div className="headerCardPayments bg-orange-200 pl-5 pr-5">
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
                data={dataCobros}
                columns={columnsCobros}
                options={opciones("Cobros pendientes")}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}

      {/**
Tabla de pagos pendientes
 */}

      <Card variant="elevation" className="m-4 ">
        <CardContent>
          <div>
            <div className="headerCardPayments bg-indigo-100 pl-5 pr-5">
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
                options={opciones("Pagos pendientes")}
               
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
                <IconButton
                  aria-label="save"
                  color="primary"
                  onClick={guardarPago}
                >
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
