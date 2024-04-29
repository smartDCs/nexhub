
import { NavLink } from "react-router-dom";

// import material icons

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptIcon from "@mui/icons-material/Receipt";

import EngineeringIcon from "@mui/icons-material/Engineering";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import SettingsIcon from "@mui/icons-material/Settings";
import { Groups3Outlined } from "@mui/icons-material";
import logo from "../assets/nexhub1.png";
import {useContext} from "react";
import {UserContext} from "../context/User/UserContext";

function Sidebar() {

const {currentUser}=useContext(UserContext);

  return (
    <div className="sidebar flex-none h-screen ">
    <div className="containerLogo">
      <img src={logo}/>
    </div>
      <div className="p-2 ">
        <ul className="text-white ">
          <li className="p-4 hover:bg-lime-400 rounded-md ">
         
            <NavLink to={currentUser?"/dashboard":"/"}>
              <DashboardIcon  className="mr-4"/>
              DASHBOARD 
            </NavLink>
           
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md ">
            <NavLink to={currentUser?"/payments":"/"}>
              <RequestQuoteIcon className="mr-4"/>
              COBROS/PAGOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md " >
            <NavLink to={currentUser?"/cotizaciones":"/"}>
              <ReceiptIcon className="mr-4"/>
              COTIZACIONES
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={currentUser?"/projects":"/"} >
              <HomeWorkIcon className="mr-4" />
               PROYECTOS
             
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={currentUser?"/inventario":"/"}>
              <Groups3Outlined className="mr-4"/>
              NÓMINA
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={currentUser?"/mantenimiento":"/"}>
              <EngineeringIcon  className="mr-4"/>
              MANTENIMIENTO
            </NavLink>
          </li>

          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={currentUser?"/neighbors":"/"}>
              <Diversity2Icon  className="mr-4"/>
              VECINOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to={currentUser?"/settings":"/"}>
              <SettingsIcon  className="mr-4"/>
              CONFIGURAR EDIFICIO
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
