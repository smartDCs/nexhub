import { Card, CardContent } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import "dayjs/locale/es-mx";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AiFillNotification } from "react-icons/ai";
import { FaSackDollar } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
    
      <div className="grid grid-cols-4 gap-4 m-9">
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1>
              Saldo en la cuenta &nbsp;
              <FaSackDollar className="icono text-yellow-400" />
            </h1>

            <ul>
              <li>Banco 1: $1234</li>
            </ul>
          </CardContent>
        </Card>
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1>Mantenimientos
&nbsp;
<FaToolbox className="icono text-red-800"/>

            </h1>
            <ul>
              <li>Programados: 2</li>
              <li>Realizados: 20</li>
            </ul>
          </CardContent>
        </Card>
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1>Inventario</h1>
          </CardContent>
        </Card>
        <Card variant="elevation">
          <CardContent className="dashboardCard">
            <h1>
              Comunicados &nbsp;
              <AiFillNotification className="text-blue-500 icono" />
            </h1>
            <ul>
              <li>No leidos: 23</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 m-9">
        <Card variant="elevation">
          <CardContent>
            <div>
              <h1>Convocar una reunión</h1>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
                <DemoContainer components={["DateTimePicker"]} >
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

        <Card variant="elevation" >
          <CardContent className="bg-yellow-100">
            <h1>Agenda</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={dayjs()} />
            </LocalizationProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
