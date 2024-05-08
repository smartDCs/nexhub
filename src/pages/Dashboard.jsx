import { Card, CardContent, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

import "dayjs/locale/es-mx";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { FaSackDollar } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
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
  plugins: {
    // legend: {
    //  position: 'bottom'
    //},
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
  "Almacen 1",
];

export const data = {
  labels,
  datasets: [
    {
      label: "m3",
      data: [
        100, 150, 120, 12, 34, 90, 67, 94, 123, 97, 87, 43, 54, 78, 32, 91, 91,
      ],
      backgroundColor: "rgba(25, 99, 255, 0.5)",
    },
  ],
};

function Dashboard() {
  const [fechaReunion, setFechaReunion] = useState();

  function enviarMensaje() {
    event.preventDefault();
    alert(
      "Se envió la comunicación para el día " +
        "\n" +
        fechaReunion
    );
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 m-9">
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1 className="justify-between">
              CUENTAS
              <FaSackDollar className="icono text-yellow-400" />
            </h1>

            <ul>
              <li>Por cobrar: $1234</li>
              <li>Por pagar: $18292</li>
            </ul>
          </CardContent>
        </Card>
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1 className="justify-between">
              PROYECTOS
              <FaToolbox className="icono text-red-800" />
            </h1>
            <ul>
              <li>Diseño: 2</li>
              <li>Construcción: 20</li>
            </ul>
          </CardContent>
        </Card>
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1 className="justify-between">
              COTIZACIONES
              <RequestQuoteIcon className="icono text-green-700" />
            </h1>
            <ul>
              <li>Vigentes: 22</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-4 gap-4 m-9 barChart ">
        <Card className="grid col-span-4 m-3" variant="outlined">
          <CardContent>
            <Bar data={data} options={options} />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 m-9">
        <Card variant="elevation">
          <CardContent>
            <div>
              <h1 className="mb-4">Convocar una reunión</h1>

              <TextField
                label="Fecha y hora de la reunión *"
                type="datetime-local"
                defaultValue={dayjs().format("yyyy-MM-DDThh:mm:ss")}
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={(event)=>setFechaReunion(event.target.value)}
                className="mt-4"
              />
            </div>

            <form className="formMeeting">
              <textarea
                placeholder="Describa el motivo de la reunion "
                className="p-2"
              ></textarea>
              <button onClick={() => enviarMensaje()}>Enviar</button>
            </form>
          </CardContent>
        </Card>
        <Card variant="elevation" className="grid col-span-1 ">
          <CardContent className="bg-yellow-100 ">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateCalendar />
            </LocalizationProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
