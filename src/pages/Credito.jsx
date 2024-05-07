
import { useState, useContext} from "react";
import { Button, Card, CardContent, MenuItem, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PrintIcon from "@mui/icons-material/Print";

import CalculateIcon from "@mui/icons-material/Calculate";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import InputAdornment from "@mui/material/InputAdornment";
import MUIDataTable from "mui-datatables";
import { opciones } from "../components/TableSettings";
import { Calculator } from "amortizejs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AmortizacionContext } from "../context/amortizacion/AmortizacionContext";


function Credito() {
 
  const { 
    setDatosCredito,
    setDatosUsuario,
    setTablaAmortizacion,
    setDatosBeneficiario
   } = useContext(AmortizacionContext);
  let navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [ci, setCi] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [oficina, setOficina] = useState("");
  const [interes, setInteres] = useState("");
  const [amount, setAmount] = useState("");
  const [plazoCredito, setPlazoCredito] = useState("");
  const [objetodelCredito, setObjetodelCredito] = useState("");
const [beneficiario,setBeneficiario]=useState("");
const [emailB,setEmailB]=useState("");
const [ciB,setCiB]=useState("");
const [addrB,setAddrB]=useState("");
const [telefonoB,setTelefonoB]=useState("");


  const newData = [];
  const plazo = [
    {
      value: 3,
      label: "3",
    },
    {
      value: 6,
      label: "6",
    },
    { value: 9, label: "9" },
    { value: 12, label: "12" },
    { value: 24, label: "24" },
    { value: 36, label: "36" },
    { value: 48, label: "48" },
    { value: 60, label: "60" },
  ];
  const [data, setData] = useState([]);
  const [interesTotal, setInteresTotal] = useState(0);
  const [fechaInicio, setFechaInicio] = useState();

  const columns = [
    {
      name: "numero",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "20px" }} className="encabezadoTabla">
              Nº
            </div>
          );
        },
      },
    },
    {
      name: "date",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "40px" }} className="encabezadoTabla">
              Fecha
            </div>
          );
        },
      },
    },
    {
      name: "interest",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "50px" }} className="encabezadoTabla">
              Interés $
            </div>
          );
        },
      },
    },
    {
      name: "capital",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "50px" }} className="encabezadoTabla">
              Capital $
            </div>
          );
        },
      },
    },
    {
      name: "principal",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "60px" }} className="encabezadoTabla">
              Cuota fija $
            </div>
          );
        },
      },
    },

    {
      name: "remainingBalance",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return (
            <div style={{ width: "100px" }} className="encabezadoTabla">
              Saldo restante $
            </div>
          );
        },
      },
    },
  ];
  function CalcularAmortizacion() {
    if (!amount || !interes || !plazoCredito) {
      alert(
        "Los datos ingresados no son válidos, por favor intente nuevamente"
      );
    } else {
      const tabla = Calculator.calculate({
        method: "interestOnly",
        apr: interes,
        balance: amount,
        loanTerm: plazoCredito,
        startDate: dayjs(fechaInicio),
      });

      
      tabla.schedule.forEach(function (elemento, indice) {
        const amort = {
          numero: indice + 1,
          interest: elemento.interest.toFixed(2),
          principal: elemento.principal.toFixed(2),
          remainingBalance: elemento.remainingBalance.toFixed(2),
          capital: (elemento.principal - elemento.interest).toFixed(2),
          date: new Date(elemento.date).toLocaleDateString(),
         
        };
        newData.push(amort);
      });
      setInteresTotal((tabla.totalInterest).toFixed(2));
     
      setData(newData);
      setDatosCredito({
        objeto: objetodelCredito,
        monto:amount,
        interes: interes,
        plazo: plazoCredito,
        interesTotal: (tabla.totalInterest).toFixed(2),
      });
     
     setDatosUsuario({
      nombre: user,
      email: email,
      ci: ci,
      addr: direccion,
      telefono: telefono,
      oficina: oficina,
      fecha:fechaInicio
    });
    setDatosBeneficiario({
      nombre: beneficiario,
      email: emailB,
      ci: ciB,
      addr: addrB,
      telefono: telefonoB,
      
    });
     setTablaAmortizacion(newData);
    }
   
  
  
   

  }
  const printTable=(event)=>{
     event.preventDefault();
       
      navigate("/report_amortizacion");
  
  }
 
  return (
    <>
      <Card className="m-4">
        <CardContent>
          <div className="border-b-gray-200 border-b-2 pb-2">
            <h1 className="font-bold">ASIGNAR CRÉDITO</h1>
          </div>
          <h1 className="text-sm italic">Datos del deudor</h1>
          <div className="grid grid-cols-12 gap-4">
            <TextField
              variant="standard"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              label={
                <label>
                  <PersonIcon className="text-green-800" />
                  Nombre
                </label>
              }
              required
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={
                <label>
                  <EmailIcon className="text-orange-400" />
                  Email
                </label>
              }
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="number"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              label={
                <label>
                  <BadgeIcon className="text-blue-400" />
                  CI.:
                </label>
              }
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-12 gap-4 mt-3">
            <TextField
              variant="standard"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              label={
                <label>
                  <PersonPinCircleIcon className="text-green-800" />
                  Dirección
                </label>
              }
              required
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="email"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              label={
                <label>
                  <WhatsAppIcon className="text-green-500" />
                  Teléfono
                </label>
              }
              required
              className="col-span-3"
            />
            <TextField
              variant="standard"
              type="text"
              value={oficina}
              onChange={(e) => setOficina(e.target.value)}
              label={
                <label>
                  <CorporateFareIcon className="text-blue-400" />
                  Oficina/Depto
                </label>
              }
              required
              className="col-span-3"
            />
          </div>
         
 {/**
          Datos del beneficiario
           */}
          <div className="bg-yellow-100">
          <h1 className="text-sm italic mt-4">Datos del beneficiario</h1>
          <div className="grid grid-cols-12 gap-4">
            <TextField
              variant="standard"
              type="text"
              value={beneficiario}
              onChange={(e) => setBeneficiario(e.target.value)}
              label={
                <label>
                  <PersonIcon className="text-green-800" />
                  Nombre
                </label>
              }
              required
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="email"
              value={emailB}
              onChange={(e) => setEmailB(e.target.value)}
              label={
                <label>
                  <EmailIcon className="text-orange-400" />
                  Email
                </label>
              }
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="number"
              value={ciB}
              onChange={(e) => setCiB(e.target.value)}
              label={
                <label>
                  <BadgeIcon className="text-blue-400" />
                  CI.:
                </label>
              }
              required
              className="col-span-3"
            />
          </div>
         
          <div className="grid grid-cols-12 gap-4 mt-3">
            <TextField
              variant="standard"
              type="text"
              value={addrB}
              onChange={(e) => setAddrB(e.target.value)}
              label={
                <label>
                  <PersonPinCircleIcon className="text-green-800" />
                  Dirección
                </label>
              }
              required
              className="col-span-4"
            />
            <TextField
              variant="standard"
              type="email"
              value={telefonoB}
              onChange={(e) => setTelefonoB(e.target.value)}
              label={
                <label>
                  <WhatsAppIcon className="text-green-500" />
                  Teléfono
                </label>
              }
              required
              className="col-span-3"
            />
           
          </div>
  
          </div>

          <div>
            <div className="mt-4 border-b-2 border-b-gray-200 pb-2">
              <h1 className="italic text-sm">Datos del crédito</h1>
            </div>
            <div className="mt-4 grid grid-cols-1">
            <TextField
              label="objeto del crédito"
              multiline
              value={objetodelCredito}
              onChange={(e) => setObjetodelCredito(e.target.value)}
            />
          </div>
            <div className="grid grid-cols-12 mt-3 gap-4">
              <TextField
                variant="standard"
                label="Monto"
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                className="col-span-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <TextField
                variant="standard"
                label="Interés"
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                className="col-span-2"
                value={interes}
                onChange={(e) => setInteres(e.target.value)}
              />
              <TextField
                variant="standard"
                label="Plazo (meses)"
                select
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                className="col-span-2"
                value={plazoCredito}
                onChange={(e) => setPlazoCredito(e.target.value)}
              >
                {plazo.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
              
               className="col-span-3"
                label="Inicio de pago *"
                type="date"
                variant="standard"
                defaultValue={dayjs().format("yyyy-MM-DD")}
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
               
                onChange={(event)=>setFechaInicio(event.target.value)}
                
              />

              <div className="col-span-2">
              <Button
                style={{ color: "rgb(100,100,100)", fontSize:"8pt" }}
                
                onClick={() => CalcularAmortizacion()}
              >
                <CalculateIcon />
                Calcular
              </Button>
              <Button
                style={{ color: "rgb(100,100,100)",fontSize:"8pt" }}
              
                onClick={printTable}
              >
                <PrintIcon />
                Imprimir
              </Button>
              </div>
             
            </div>
          </div>

          {/**
Tabla de amortización
 */}
          <div className="mt-4">
           
            <MUIDataTable
              title={"Tabla de amortización"}
              options={opciones(
                `Tabla de amortización ${user}`,
                "220px",
                "100%"
              )}
              columns={columns}
              data={data}
            />
          </div>
          <label>Interes total {interesTotal}</label>
        </CardContent>
      </Card>
    </>
  );
}

export default Credito;



