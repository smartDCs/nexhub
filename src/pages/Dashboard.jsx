import { Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

import "dayjs/locale/es-mx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { FaSackDollar } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa";

import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
function Dashboard() {
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

      <div className="grid grid-cols-2 gap-4 m-9">
        <Card variant="elevation">
          <CardContent>
            <div>
              <h1>Convocar una reunión</h1>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es-mx"
              >
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="Día y hora de la reunión" />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <form className="formMeeting">
              <textarea placeholder="Describa el motivo de la reunion "></textarea>
              <button>Enviar</button>
            </form>
          </CardContent>
        </Card>

        <Card variant="elevation">
          <CardContent className="bg-yellow-100">
            <h1>Agenda</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DateCalendar value={dayjs()} />
            </LocalizationProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
