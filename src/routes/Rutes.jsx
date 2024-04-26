import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import Payments from "../pages/Payments";
import Login from "../pages/Login";
import Neighbors from "../pages/Neighbors";
import BuildSettings from "../pages/BuildSettings";
import Report from "../pages/Report";
import Projects from "../pages/Projects";
import Cotizaciones from "../pages/Cotizaciones";
import ReportCotizacion from '../pages/ReportCotizacion';
import ResetPassword from "../pages/ResetPassword";
import AddUser from "../pages/AddUser";
const Rutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/cotizaciones" element={<Cotizaciones />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/projects" element={<Projects/>} />
    <Route path="/neighbors" element={<Neighbors/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/settings" element={<BuildSettings/>} />
    <Route path="/report_payment" element={<Report/>}/>
    <Route path="/report_quote" element={<ReportCotizacion/>}/>
    <Route path="/resetPassword" element={<ResetPassword/>}/>
    <Route path="/registerUser" element={<AddUser/>}/>
  </Routes>
  )
}

export default Rutes