import { Button, Card, CardContent, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import InputAdornment from "@mui/material/InputAdornment";
import MUIDataTable from "mui-datatables";
import { opciones } from "../components/TableSettings";
import {Calculator} from 'amortizejs';
import dayjs from "dayjs";
function Credito() {
  const [user, setUser] = useState("Usuario");
  const [interes,setInteres]=useState();
  const [amount,setAmount]=useState();
const [plazoCredito,setPlazoCredito]=useState(3);
const newData=[];
  const plazo = [
    {
      value: 3,
    },
    {
      value: 6,
    },
    { value: 9 },
    { value: 12 },
    { value: 24 },
    { value: 36 },
    { value: 48 },
    { value: 60 },
  ];
  const [data, setData] = useState([]);
const [interesTotal,setInteresTotal]=useState(0);
  const columns = [
    {
      name: "numero",
      options:{
        filter:false,
        sort:false,
        setCellProps:()=>(
            {
                style:{margin:0,padding:0,fontSize:11}
            }
        ),
        customHeadLabelRender:()=>{
            return(
                <div style={{width:'20px'}} className="encabezadoTabla">
                    Nº
                </div>
            )
        }
      },
      
    },
    {
        name: "date",
        options:{
          filter:false,
          sort:false,
          setCellProps:()=>(
              {
                  style:{margin:0,padding:0,fontSize:11}
              }
          ),
          customHeadLabelRender:()=>{
              return(
                  <div style={{width:'40px'}} className="encabezadoTabla">
                      Fecha
                  </div>
              )
          }
        },
        
      },
      {
        name: "interest",
        options:{
          filter:false,
          sort:false,
          setCellProps:()=>(
              {
                  style:{margin:0,padding:0,fontSize:11}
              }
          ),
          customHeadLabelRender:()=>{
              return(
                  <div style={{width:'50px'}} className="encabezadoTabla">
                      Interés $
                  </div>
              )
          }
        },
        
      },
      {
        name: "capital",
        options:{
          filter:false,
          sort:false,
          setCellProps:()=>(
              {
                  style:{margin:0,padding:0,fontSize:11}
              }
          ),
          customHeadLabelRender:()=>{
              return(
                  <div style={{width:'50px'}} className="encabezadoTabla">
                      Capital $
                  </div>
              )
          }
        },
        
      },
      {
        name: "principal",
        options:{
          filter:false,
          sort:false,
          setCellProps:()=>(
              {
                  style:{margin:0,padding:0,fontSize:11}
              }
          ),
          customHeadLabelRender:()=>{
              return(
                  <div style={{width:'60px'}} className="encabezadoTabla">
                      Cuota fija $
                  </div>
              )
          }
        },
        
      },
    
    {
        name: "remainingBalance",
        options:{
          filter:false,
          sort:false,
          setCellProps:()=>(
              {
                  style:{margin:0,padding:0,fontSize:11}
              }
          ),
          customHeadLabelRender:()=>{
              return(
                  <div style={{width:'70px'}} className="encabezadoTabla">
                      Saldo restante $
                  </div>
              )
          }
        },
        
      },
      
     
    
    
  ];
  function CalcularAmortizacion(){
 
    
    const tabla=Calculator.calculate({
        method:'interestOnly',
        apr:interes,
        balance:amount,
        loanTerm:plazoCredito,
        startDate:dayjs(),
      });
       
      console.log('Programación de pagos:', tabla.schedule);
      setInteresTotal(tabla.totalInterest);
     tabla.schedule.forEach(function(elemento,indice){
        const amort={
            numero:indice,
            interest:(elemento.interest).toFixed(2),
            principal:(elemento.principal).toFixed(2),
            remainingBalance:(elemento.remainingBalance).toFixed(2),
            capital:(elemento.principal-elemento.interest).toFixed(2),
          date:new Date(elemento.date).toLocaleDateString()
        }
      newData.push(amort);
     })
     setData(newData);
   
    
  }
  return (
    <>
      <Card className="m-4">
        <CardContent>
          <div className="border-b-gray-200 border-b-2 pb-2">
            <h1 className="font-bold">ASIGNAR CRÉDITO</h1>
          </div>
          <h1 className="text-sm italic">Datos del beneficiario</h1>
          <div className="grid grid-cols-12 gap-4">
            <TextField
              variant="standard"
              type="text"
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
          <div className="mt-4 grid grid-cols-1">
            <TextField label="objeto del crédito" multiline />
          </div>

          <div>
            <div className="mt-4 border-b-2 border-b-gray-200 pb-2">
              <h1 className="italic text-sm">Datos del crédito</h1>
            </div>
            <div className="grid grid-cols-12 mt-3 gap-3">
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
                label="Tasa de interés"
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
                label="Tiempo (meses)"
                select
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                className="col-span-2"
                value={plazoCredito}
                onChange={(e)=>setPlazoCredito(e.target.value)}
              >
                {plazo.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
                
              </TextField>
              <Button onClick={()=>CalcularAmortizacion()}>Calcular</Button>
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
                "300px",
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
