import { Card, CardContent, TextField } from "@mui/material";

import { useState, useContext, useEffect } from "react";

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
  collection,
  getDocs,
  query,
  addDoc,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { UserContext } from "../context/User/UserContext";
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

export const optionsAgua = {
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

export const optionsEnergia = {
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

function Dashboard() {
  const { userData, db } = useContext(UserContext);
  const user = userData.user;

  const [eventos, setEventos] = useState([]);
  const [fechaReunion, setFechaReunion] = useState();
  const [motivo, setMotivo] = useState();
  const [graficaEnergia, setGraficaEnergia] = useState({
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });
  const [graficaAgua, setGraficaAgua] = useState({
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });
  const coleccion = query(collection(db, "/recordatorios"));

  const getRecordatorios = async () => {
    const dataAgenda = await getDocs(coleccion);
    const datosAgenda = dataAgenda.docs.map((doc) => ({
      title: doc.data().evento + "; Responsable:" + doc.data().responsable,
      start: new Date(doc.data().fechaInicio),
      end: new Date(doc.data().fechaFin),
      reservado: doc.data().reservado,
      responsable: doc.data().responsable,
    }));
    setEventos(datosAgenda);
  };

  /**
   * obtener los datos de consumo energético
   */
  

  const coleccionEnergia = query(
    collection(db, "energia"),
    where("anio", "==", "2024"),
    orderBy("mes","asc")
  );
  const getEnergia = async () => {
    const dataEnergia = await getDocs(coleccionEnergia);
    const datosEnergia = dataEnergia.docs.map((doc) => ({
      anio: doc.data().anio,
      consumo: doc.data().consumo,
      mes: doc.data().mes,
    }));
    const dataSets = datosEnergia.map((dato) => dato.consumo);
    const labels = datosEnergia.map((dato) => dato.mes);

    setGraficaEnergia({
      labels,
      datasets: [
        {
          label: "Consumo de energía",
          data: dataSets,
          backgroundColor: "rgba(250, 102, 2, 0.5)",
          borderColor: "rgba(250, 102, 2, 1)",
          borderWidth: 1,
        },
      ],
    });
  };
  /**
   * obtener los datos de consumo de agua
   */
  const coleccionAgua = query(
    collection(db, "/agua"),
    where("anio", "==", "2024"),
    orderBy("mes","asc")
  );
  const getAgua = async () => {
    const dataAgua = await getDocs(coleccionAgua);
    const datosAgua = dataAgua.docs.map((doc) => ({
      anio: doc.data().anio,
      consumoTotal: doc.data().consumoTotal,
      mes: doc.data().mes,
    }));
    const dataSets = datosAgua.map((dato) => dato.consumoTotal);
    const labels = datosAgua.map((dato) => dato.mes);

    setGraficaAgua({
      labels,
      datasets: [
        {
          label: "Consumo de agua ",
          data: dataSets,
          backgroundColor: "rgba(75, 192, 204, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    moment.locale("es");
    getRecordatorios();
    getEnergia();
    getAgua();
  }, []);

  /**
   * guardar los eventos de la agenda en la base de datos
   */
  function limpiarConvocatoria() {
    setFechaReunion(dayjs().format("YYYY-MM-DDTHH:mm"));
    setMotivo("");
  }

  function enviarMensaje() {
    event.preventDefault();
    const eventosRef = collection(db, "recordatorios");
    addDoc(eventosRef, {
      evento: motivo,
      fechaInicio: fechaReunion,
      fechaFin: dayjs(fechaReunion).add(2, "hour").format("YYYY-MM-DDTHH:mm"),
      responsable: user,
      reservado: false,
    });

    limpiarConvocatoria();
  }

  const localizer = momentLocalizer(moment); // Configura el localizador

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
            <Bar
              data={graficaAgua}
              options={optionsAgua}
              style={{ height: "30vh" }}
            />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <Bar
              data={graficaEnergia}
              options={optionsEnergia}
              style={{ height: "30vh" }}
            />
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
              const backgroundColor = event.reservado
                ? "rgba(200,0,10,0.3)"
                : "rgba(100,220,100,0.3)";
              return { style: { backgroundColor, color: "black" } };
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
                defaultValue={dayjs().format("YYYY-MM-DDTHH:mm")}
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
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
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
