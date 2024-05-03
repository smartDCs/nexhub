import { NavLink } from "react-router-dom";

// import material icons

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptIcon from "@mui/icons-material/Receipt";

import EngineeringIcon from "@mui/icons-material/Engineering";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { FaBuildingUser } from "react-icons/fa6";
import { Groups3Outlined } from "@mui/icons-material";
import logo from "../assets/nexhub1.png";
import { useContext } from "react";
import { UserContext } from "../context/User/UserContext";

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
            <NavLink to={userData.user ? "/payments" : "/payments"}>
              <RequestQuoteIcon className="mr-4" />
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
            <NavLink to={userData.user ? "/inventario" : "/"}>
              <Groups3Outlined className="mr-4" />
              NÓMINA
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
              <GroupAddIcon className="mr-4" />
              AGREGAR USUARIO
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
