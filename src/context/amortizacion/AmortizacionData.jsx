import { useState  } from "react";
import  {AmortizacionContext}  from "./AmortizacionContext";


const  AmortizacionData=({children})=>{
 
  const [datosUsuario, setDatosUsuario] = useState({});
  const [datosCredito, setDatosCredito] = useState({});
  const [datosBeneficiario, setDatosBeneficiario] = useState({}); 
  const [tablaAmortizacion, setTablaAmortizacion] = useState([]);
 
  return (
    <AmortizacionContext.Provider
      value={{
        datosUsuario,
        datosCredito,
    tablaAmortizacion,
    setDatosUsuario,
    setDatosCredito,
    setTablaAmortizacion,
    datosBeneficiario, 
    setDatosBeneficiario
      }}
    >
      {children}
    </AmortizacionContext.Provider>
  );
};

export default AmortizacionData;
