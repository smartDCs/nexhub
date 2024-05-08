import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import SpeedIcon from "@mui/icons-material/Speed";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      
       legend: {
        position: 'top',
     
      },
      title: {
        display: true,
        text: "Consumo de agua mensual",
      },
    },
  };
  
  const labels = [
    "Depto 101",
    "Depto 102",
    "Depto 103",
    "Depto 104",
    "Depto 201",
    "Depto 202",
    "Depto 203",
    "Depto 204",
    "Depto 301",
    "Depto 302",
    "Depto 303",
    "Depto 304",
    "Depto 401",
    "Depto 402",
    "Depto 403",
    "Depto 404",
    
  ];
  
 

function PlanillasAgua() {
  const fecha = dayjs().format("DD/MM/YYYY");
  const [consumoTotal, setConsumoTotal] = useState(40);
  const [mesConsumo, setMesConsumo] = useState("");
  const [oficina, setOficina] = useState("");
  const [NumeroMedidor, setNumeroMedidor] = useState("");
  const [nuevoMedidor,setNuevoMedidor]=useState("");
  const [nuevaOficina,setNuevaOficina]=useState("");
  const mes = [
    { value: "ENERO", label: "ENERO" },
    { value: "FEBRERO", label: "FEBRERO" },
    { value: "MARZO", label: "MARZO" },
    { value: "ABRIL", label: "ABRIL" },
    { value: "MAYO", label: "MAYO" },
    { value: "JUNIO", label: "JUNIO" },
    { value: "JULIO", label: "JULIO" },
    { value: "AGOSTO", label: "AGOSTO" },
    { value: "SEPTIEMBRE", label: "SEPTIEMBRE" },
    { value: "OCTUBRE", label: "OCTUBRE" },
    { value: "NOVIEMBRE", label: "NOVIEMBRE" },
    { value: "DICIEMBRE", label: "DICIEMBRE" },
  ];
  const selectOficina = [
    { value: "OFICINA 101", label: "OFICINA 101", medidor: "234167" },
    { value: "OFICINA 102", label: "OFICINA 102", medidor: "238967" },
    { value: "OFICINA 103", label: "OFICINA 103", medidor: "234118" },
    { value: "OFICINA 104", label: "OFICINA 104", medidor: "234109" },
    { value: "OFICINA 201", label: "OFICINA 201", medidor: "234154" },
    { value: "OFICINA 202", label: "OFICINA 202", medidor: "234187" },
    { value: "OFICINA 203", label: "OFICINA 203", medidor: "234144" },
    { value: "OFICINA 204", label: "OFICINA 204", medidor: "234199" },
    { value: "OFICINA 301", label: "OFICINA 301", medidor: "234167" },
    { value: "OFICINA 302", label: "OFICINA 302", medidor: "234100" },
    { value: "OFICINA 303", label: "OFICINA 303", medidor: "234166" },
    { value: "OFICINA 304", label: "OFICINA 304", medidor: "234123" },
    { value: "OFICINA 401", label: "OFICINA 401", medidor: "234337" },
    { value: "OFICINA 402", label: "OFICINA 402", medidor: "234109" },
    { value: "OFICINA 403", label: "OFICINA 403", medidor: "234156" },
    { value: "OFICINA 404", label: "OFICINA 404", medidor: "234122" },
  ];
 const data = {
    labels,
    datasets: [
      {
        label:"Total "+consumoTotal+" m³",
        data: [
          10, 15, 12, 12, 4, 3, 6, 4, 3, 7, 8, 3, 54, 8, 3, 9,
        ],
        backgroundColor: "rgba(25, 99, 255, 0.5)",
      },
    ],
  };
  //console.log(data.datasets[0].data);
  useEffect(()=>{
    setConsumoTotal(data.datasets[0].data.reduce((prev,curr)=>prev+curr,0));
  },[]);
 
  return (
    <Card 
    style={{height:"auto"}}
    className="m-4">
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ color: "rgb(255,20,0)" }}>
            CONSUMO MENSUAL DEL EDIFICIO:{" "}
            <strong>
              {consumoTotal}m<sup>3</sup>
            </strong>
          </label>
          <label>{fecha}</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="cols-span-1 grid  border p-2 ">
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0",
                paddingTop: 10,
              }}
              className="row-span-1 pb-4"
            >
              DATOS DE CONSUMO
            </label>
            <div className="grid grid-cols-2 ">
              <TextField
                variant="standard"
                label="Oficina/Depto"
                select
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                required
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                value={oficina}
                onChange={(e) => {
                  setOficina(e.target.value);
                  selectOficina.map((datos) => {
                    if (datos.value === e.target.value) {
                      setNumeroMedidor(datos.medidor);
                    }
                  });
                }}


              >
                {selectOficina.map((option) => (
                  <MenuItem 
                  style={{fontSize:12}}
                  key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="standard"
                label="Medidor #"
                disabled
                style={{ marginRight: 10, marginBottom: 10 }}
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"><SpeedIcon/></InputAdornment>
                  ),
                }}
                value={NumeroMedidor}
              />
            </div>
            <div className="grid grid-cols-2">
              <TextField
                variant="standard"
                label="Lectura actual"
                required
                type="number"
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="standard"
                label="Mes de consumo"
                select
                required
                style={{ marginRight: 10, marginBottom: 10 }}
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                value={mesConsumo}
                onChange={(e) => setMesConsumo(e.target.value)}
              >
                {mes.map((option) => (
                  <MenuItem
                    style={{ fontSize: 12 }}
                    key={option.value}
                    value={option.value}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Button>
                <SaveIcon /> Guardar
              </Button>
            </div>
          </div>
          <div className="cols-span-1 grid  border p-2 ">
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0",
                paddingTop: 10,
              }}
              className="row-span-1 pb-4"
            >
              NUEVO MEDIDOR
            </label>
            <div className="grid grid-cols-2">
            <TextField
                variant="standard"
                label="Oficina/Depto"
                select
                style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                required
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                value={nuevaOficina}
                onChange={(e) => {
                  setNuevaOficina(e.target.value);
                 
                }}


              >
                {selectOficina.map((option) => (
                  <MenuItem 
                  style={{fontSize:12}}
                  key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="standard"
                label="Medidor #"
               type='number'
                style={{ marginRight: 10, marginBottom: 10 }}
                InputProps={{
                    style:{fontSize:12,},
                  startAdornment: (
                    <InputAdornment position="start"><SpeedIcon/></InputAdornment>
                  ),
                }}
                value={nuevoMedidor}
                onChange={(e)=>setNuevoMedidor(e.target.value)}
              />
            </div>
           
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Button>
                <AddIcon /> AGREGAR MEDIDOR
              </Button>
            </div>
          </div>
        </div>
<div>
<Bar data={data} options={options}
style={{height:"40vh"}}
 />
</div>


      </CardContent>
    </Card>
  );
}

export default PlanillasAgua;
