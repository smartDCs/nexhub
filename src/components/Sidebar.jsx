import { NavLink } from "react-router-dom";

// import material icons

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptIcon from "@mui/icons-material/Receipt";

import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { FaBuildingUser } from "react-icons/fa6";

import logo from "../assets/nexhub1.png";
import { useContext } from "react";
import { UserContext } from "../context/User/UserContext";
import PaymentsIcon from '@mui/icons-material/Payments';
import SpeedIcon from '@mui/icons-material/Speed';
function Sidebar() {
  const { userData } = useContext(UserContext);

  return (
    <div className="sidebar flex-none h-screen ">
      <div className="containerLogo">
        <img src={logo} />
      </div>
      <div className="p-2 ">
        <ul className="text-white ">
          <li className="p-4 hover:bg-lime-400 rounded-md ">
            <NavLink to={userData.user ? "/dashboard" : "/"}>
              <DashboardIcon className="mr-4" />
              DASHBOARD
            </NavLink>
          </li>
          <li
            className="p-4 hover:bg-lime-400 rounded-md "
            //  hidden={userData.rol==="SuperAdmin"?false:true}
          >
            <NavLink to={userData.user ? "/credito" : "/"}>
              <RequestQuoteIcon className="mr-4" />
              CRÉDITO A COPROPIETARIOS
            </NavLink>
          </li>
          <li
            className="p-4 hover:bg-lime-400 rounded-md "
            //  hidden={userData.rol==="SuperAdmin"?false:true}
          >
            <NavLink to={userData.user ? "/payments" : "/payments"}>
              <PaymentsIcon className="mr-4" />
              COBROS/PAGOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md ">
            <NavLink to={userData.user ? "/cotizaciones" : "/"}>
              <ReceiptIcon className="mr-4" />
              COTIZACIONES
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={userData.user ? "/projects" : "/"}>
              <HomeWorkIcon className="mr-4" />
              PROYECTOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={userData.user ? "/planillasagua" : "/"}>
              <SpeedIcon className="mr-4" />
              CONSUMO DE AGUA
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={userData.user ? "/mantenimiento" : "/"}>
              <EngineeringIcon className="mr-4" />
              MANTENIMIENTO
            </NavLink>
          </li>

          <li className="p-4 hover:bg-lime-400 rounded-md justify-between flex">
            <NavLink
              to={userData.user ? "/neighbors" : "/"}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FaBuildingUser className="mr-4" style={{ fontSize: "18pt" }} />
              <label>COPROPIETARIOS</label>
            </NavLink>
          </li>
          <li
            className="p-4 hover:bg-lime-400 rounded-md"
            hidden={userData.rol === "SuperAdmin" ? false : true}
          >
            <NavLink to={userData.user ? "/settings" : "/"}>
              <SettingsIcon className="mr-4" />
              CONFIGURACIÓN
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
