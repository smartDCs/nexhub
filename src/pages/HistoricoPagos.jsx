import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/User/UserContext";
import { Card, CardContent, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";

import DoneIcon from "@mui/icons-material/Done";
import { collection, getDocs, query, where } from "firebase/firestore";
import { opciones } from "../components/TableSettings";
function HistoricoPagos() {
  const { userData, db } = useContext(UserContext);
  const user = userData.user;

  const userUid = userData.userUid;
  const [data, setData] = useState([]);
 
 
  const coleccion = query(
    collection(db, `/pagos/${userUid}/registros`),
    where("status", "==", "cancelado")
  );

  const getPagos = async () => {
    const dataPagos = await getDocs(coleccion);

    const pagosData = dataPagos.docs.map((doc) => ({
      beneficiario: doc.data().beneficiario,
      monto: doc.data().monto,
      date: doc.data().fechaPago,
      concepto: doc.data().concepto,
      formaPago: doc.data().formaPago,
    }));

    setData(pagosData);
  };

  useEffect(() => {
    getPagos();
  }, []);

 
  const columnsPagos = [
    {
      name: "payment",
      label: " ",
      options: {
        setCellProps: () => ({
          style: { margin: 0, padding: 0 },
        }),

        customBodyRender: () => {
          return (
            <DoneIcon style={{ width: "15px" }} className="text-lime-600" />
          );
        },
      },
    },
    {
      name: "beneficiario",
      options: {
        setCellProps: () => ({
          style: { width: "25%", margin: 0, padding: 0, fontSize: 11 },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Beneficiario</div>;
        },
      },
    },
    {
      name: "date",

      options: {
        setCellProps: () => ({
          style: {
            width: "10%",
            fontSize: 11,
            margin: 0,
            padding: 0,
            textAlign: "center",
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Fecha</div>;
        },
      },
    },
    {
      name: "monto",

      options: {
        setCellProps: () => ({
          style: {
            width: "15%",
            backgroundColor: "rgba(255,180,50,0.6)",
            margin: 0,
            padding: 0,
            fontSize: 11,
            textAlign: "center",
          },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Monto $</div>;
        },
      },
    },
    {
      name: "concepto",

      options: {
        setCellProps: () => ({
          style: {
            width: "25%",

            margin: 0,
            padding: 0,
            fontSize: 11,
          },
        }),

        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Por concepto de</div>;
        },
      },
    },
    {
      name: "formaPago",

      options: {
        setCellProps: () => ({
          style: {
            width: "20%",

            margin: 0,
            padding: 0,
            fontSize: 11,
          },
        }),
        customHeadLabelRender: () => {
          return <div className="encabezadoTabla">Forma de pago</div>;
        },
      },
    },
  ];

  return (
    <>
      {/**
    datos usuario
     */}
      <Card className="m-4">
        <CardContent>
          <label>Nombre:</label>
          <TextField
            variant="standard"
            value={user}
            disabled
            style={{ padding: "0 15px" }}
          />
          <label>CI./RUC:</label>
          <TextField
            variant="standard"
            value={userData.ruc}
            disabled
            style={{ padding: "0 15px" }}
          />
        </CardContent>
      </Card>

      {/**
      Tabla Historicos
       */}

      <Card className="m-4">
        <CardContent>
          <MUIDataTable
            title={"Historial de pagos"}
            data={data}
            columns={columnsPagos}
            options={opciones("Historico de pagos")}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default HistoricoPagos;
