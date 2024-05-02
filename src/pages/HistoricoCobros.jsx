import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/User/UserContext";
import { Card, CardContent, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";

import DoneIcon from "@mui/icons-material/Done";
import { collection, getDocs, query, where } from "firebase/firestore";

function HistoricoCobros() {
  const { userData, db } = useContext(UserContext);
  const user = userData.user;

  const userUid = userData.userUid;
  const [data, setData] = useState([]);
  const responsive = "standard";
  const tableBodyHeight = "400px";
  const tableBodyMaxHeight = "100%";
 
  const coleccion = query(
    collection(db, `/cobros/${userUid}/registros`),
    where("status", "==", "cancelado")
  );

  const getCobros = async () => {
    const dataCobros = await getDocs(coleccion);

    const cobrosData = dataCobros.docs.map((doc) => ({
      deudor: doc.data().deudor,
      monto: doc.data().monto,
      date: doc.data().fechaPago,
      concepto: doc.data().concepto,
      formaPago: doc.data().formaPago,
    }));

    setData(cobrosData);
  };

  useEffect(() => {
    getCobros();
  }, []);

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: false,
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: "No se encontraron coincidencias",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente",
        previous: "Atras",
        rowsPerPage: "Filas:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Limpiar filtros",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "Fila(s) seleccionadas",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    },
    downloadOptions:{
      filename:"Historial de Cobros",
    }

  };
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
            title={"Historial de cobros"}
            data={data}
            columns={columnsPagos}
            options={options}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default HistoricoCobros;
