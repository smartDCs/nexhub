import React from "react";

import { NavLink } from "react-router-dom";

// import material icons

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import SettingsIcon from "@mui/icons-material/Settings";
function Sidebar() {
  return (
    <div className="sidebar flex-none w-64 h-screen bg-teal-950">
      <div className="p-2">
        <ul className="text-white">
          <li className="p-4 hover:bg-lime-400 rounded-md ">
            <NavLink to="/">
              <DashboardIcon className="icono" />
              DASHBOARD
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/payments">
              <RequestQuoteIcon className="icono" />
              COBROS/PAGOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/invoices">
              <ReceiptIcon className="icono" />
              INVOICES
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/projects">
              <HomeWorkIcon className="icono" />
              PROYECTOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/inventario">
              <InventoryIcon className="icono" />
              INVENTARIO
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/mantenimiento">
              <EngineeringIcon className="icono" />
              MANTENIMIENTO
            </NavLink>
          </li>

          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/neighbors">
              <Diversity2Icon className="icono" />
              VECINOS
            </NavLink>
          </li>
          <li className="p-4 hover:bg-lime-400 rounded-md">
            <NavLink to="/settings">
              <SettingsIcon className="icono" />
              CONFIGURAR EDIFICIO
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
