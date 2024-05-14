import { Card, CardContent, TextField } from "@mui/material";

import { useState } from "react";

import "dayjs/locale/es-mx";

import { FaSackDollar } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Bar } from "react-chartjs-2";

import dayjs from "dayjs";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importa los estilos CSS

import moment from "moment/min/moment-with-locales";

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
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Consumo de agua mensual",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return `${value} m³`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value} m³`;
        },
      },
    },
  },
};

export const options1 = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%",
  plugins: {
    legend: {
      position: "left",
      display: false,
    },

    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return `${value} Kw/h`;
        },
      },
    },
    title: {
      display: true,
      text: "Consumo eléctrico comunal",
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value} Kw/h`;
        },
      },
    },
  },
};

const labels = [
  "Ene.",
  "Feb.",
  "Mar.",
  "Abr.",
  "May.",
  "Jun.",
  "Jul.",
  "Ago.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dic.",
];

export const data = {
  labels,
  datasets: [
    {
      label: "m³",
      data: [100, 150, 120, 12, 34, 90, 67, 94, 123, 97, 87, 43],
      backgroundColor: "rgba(25, 99, 255, 0.5)",
    },
  ],
};
export const data1 = {
  labels,
  datasets: [
    {
      label: "Kw/h",
      data: [80, 85, 120, 92, 84, 90, 107, 94, 123, 97, 87, 93],
      backgroundColor: ["rgba(75, 192, 192, 0.8)"],
    },
  ],
};

function Dashboard() {
  moment.locale("es");

  const [fechaReunion, setFechaReunion] = useState();

  function enviarMensaje() {
    event.preventDefault();
    alert("Se envió la comunicación para el día " + "\n" + fechaReunion);
  }

  const localizer = momentLocalizer(moment); // Configura el localizador

  const eventos = [
    {
      title: "Reunión importante",
      start: new Date("2024-05-15T10:00"),
      end: new Date("2024-05-15T12:00"),
    },
    {
      title: "Reunión 2",
      start: new Date("2024-05-18T18:00"),
      end: new Date("2024-05-18T20:00"),
    },
    {
      title: "Reunión 3",
      start: new Date("2024-06-01T18:00"),
      end: new Date("2024-06-01T20:00"),
    },
    {
      title: "Reunión 4",
      start: new Date("2024-06-18T18:00"),
      end: new Date("2024-06-18T20:00"),
    },
    {
      allday: true,
      start: new Date("2024-05-26T00:00"),
      end: new Date("2024-05-27T23:59"),
      title: "Vacaciones",
    },
    {
      reservado: true,
      start: new Date("2024-05-16T00:00"),
      end: new Date("2024-05-17T23:59"),
      title: "Cerrado por mantenimiento",
    },
    // Agrega más eventos aquí...
  ];

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
        <Card className="col-span-2">
          <CardContent>
            <Bar data={data} options={options} style={{ height: "30vh" }} />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <Bar data={data1} options={options1} style={{ height: "30vh" }} />
          </CardContent>
        </Card>
      </div>
      <div style={{ height: "400px" }} className="m-9 bg-yellow-100 p-4">
        <div className=" agenda">
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ width: "100%", height: "100%" }} // Ajusta la altura según tus necesidades
            messages={{
              next: "Sig.",
              previous: "Ant.",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              noEventsInRange: "No existen eventos programados",
            }}
            eventPropGetter={(event) => {
              const backgroundColor = event.reservado ? "rgba(200,0,10,0.3)" : "blue";
              return { style: { backgroundColor } };
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 m-9">
        <Card variant="elevation">
          <CardContent>
            <div>
              <h1 className="mb-4">Convocar una reunión</h1>

              <TextField
                label="Fecha y hora de la reunión *"
                type="datetime-local"
                defaultValue={dayjs().format("YYYY-MM-DDThh:mm")}
                color="success"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={(event) => setFechaReunion(event.target.value)}
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
      </div>
     
    </div>
  );
}

export default Dashboard;
