import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";
import Login from "../pages/Login";
import Neighbors from "../pages/Neighbors";
import BuildSettings from "../pages/BuildSettings";
import Report from "../pages/Report";
import Projects from "../pages/Projects";
const Rutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/invoices" element={<Invoices />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/projects" element={<Projects/>} />
    <Route path="/neighbors" element={<Neighbors/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/settings" element={<BuildSettings/>} />
    <Route path="/report_payment" element={<Report/>}/>
  </Routes>
  )
}

export default Rutes