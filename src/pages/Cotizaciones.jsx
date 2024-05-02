import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { MdEditDocument } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IoIosSave } from "react-icons/io";
import MUIDataTable from "mui-datatables";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function Cotizaciones() {

  let navigate=useNavigate();
  const [cotizacion, setCotizacion] = useState(22);

  /** constantes para la tabla */
  
  const responsive= "simple";
  const tableBodyHeight = "600px";
  const tableBodyMaxHeight="100%";
 

  /**
   * Variables para la tabla
   */
  const [cantidad, setCantidad] = useState(1);
  /**
   * Variables datos informativos
   */
  const comboOptions = ["8", "15", "30"];
  const [comboValue, setComboValue] = useState(comboOptions[0]);
  const [inputValue, setInputValue] = useState("");

  const optionsPago = ["Efectivo", "Transferencia", "Crédito"];
  const [comboPago, setComboPago] = useState(optionsPago[0]);
  const [inputPago, setInputPago] = useState("");

  const columns = [
    {
      name: "item",
      label: "ITEN",
    },
    {
      name: "code",
      label: "CODIGO",
    },
    {
      name: "description",
      label: "DESCRIPCCION",
    },
    {
      name: "unity",
      label: "UNIDAD",
    },
    {
      name: "quantity",
      label: "CANTIDAD",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const handleChange = (event) => {
            const id = tableMeta.rowData[1];
          };
          return (
            <TextField
              variant="standard"
              type="number"
              value={cantidad}
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
              onChange={() => {
                setCantidad(event.target.value);
                console.log(event.target.value);
              }}
            />
          );
        },
      },
    },
    {
      name: "price1",
      label: "P.U.($)",
    },
    {
      name: "price2",
      label: "P.T.($)",
    },
  ];

  const data = [
    {
      item: 1,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x8+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 2,
      code: "INSELEC",
      description: "Punto de tomacorriente 110V",
      unity: "u",
      cantidad: 3,
      price1: 523,
      price2: 1569,
    },
    {
      item: 3,
      code: "INSELEC",
      description: "Punto de iluminación",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 4,
      code: "INSELEC",
      description: "Punto de red CAT-6",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 5,
      code: "INSELEC",
      description: "Mano de obra por instalación de acometida 3x10+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 6,
      code: "INSELEC",
      description:
        "Mano de obra por instalación de varilla de puesta a tierra con GEM conductivo",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 7,
      code: "INSELEC",
      description: "Punto de tomacorriente 220V",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 8,
      code: "INSELEC",
      description: "Mano de obra por instalación acometida 3x6+10 AWG",
      unity: "m",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 9,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 1 a 12 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 10,
      code: "INSELEC",
      description: "Armado de tablero eléctrico de 13 a 24 circuitos",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 11,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero analógico",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
    {
      item: 12,
      code: "INSELEC",
      description: "Instalación y configuración de videoportero IP",
      unity: "u",
      cantidad: 3,
      price1: 5,
      price2: 8,
    },
  ];
 
  const options = {
    search: true,
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: "multiple",

    textLabels: {
      body: {
        noMatch: "No se agrego ningún elemento",
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
  
  };
  const hoy = dayjs().format("YYYY/MM/DD");

/**
 * Función para generar el pdf de la cotizacion
 *  */ 
function PrintReport(event){
  event.preventDefault();
  //Guardar la cotización en la DB
  navigate("/report_quote");
}

  return (
    <div className="grid grid-cols-1 m-9 ">
      <Card variant="elevation">
        <CardContent>
          <div className="text-red-900 flex justify-end">
            <Typography fontSize={26}>
              <MdEditDocument className="mr-4" />
            </Typography>
            <div className="grid grid-rows-2 text-end">
              <Typography>COTIZACIÓN #: {cotizacion}</Typography>
              <Typography>{hoy}</Typography>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <TextField
              variant="standard"
              label="Cliente:"
              className="col-span-2"
            />
            <TextField
              variant="standard"
              label="C.I./RUC."
              className="col-span-1"
            />
            <TextField
              variant="standard"
              label="Teléfono"
              className="col-span-1"
            />
          </div>
          <div className="grid grid-cols-8 gap-4">
            <TextField
              variant="standard"
              label="Dirección:"
              className="col-span-3"
            />
            <TextField
              variant="standard"
              label="E-mail:"
              className="col-span-3"
            />
            <div className="col-span-2">
              <div className="grid grid-rows-2">
                <Autocomplete
                  value={comboPago}
                  onChange={(event, newValue) => {
                    setComboPago(newValue);
                  }}
                  inputValue={inputPago}
                  onInputChange={(event, newInputValue) => {
                    setInputPago(newInputValue);
                  }}
                  options={optionsPago}
                  size="small"
                  sx={{
                    width: "full",
                    marginTop: "10px",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Forma de pago" />
                  )}
                />
                <Autocomplete
                  value={comboValue}
                  onChange={(event, newValue) => {
                    setComboValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={comboOptions}
                  size="small"
                  sx={{
                    width: "full",
                    marginTop: "10px",
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Días válidos de la oferta" />
                  )}
                >
                  Días
                </Autocomplete>
              </div>
            </div>
          </div>
          <div className=" QuoteDetail">
            <h1>DETALLE</h1>
            <div className="grid grid-cols-8 gap-2 mb-4 ">
              <TextField
                variant="standard"
                label="Código o descripción del producto"
                className="col-span-5"
              />
              <Button
                variant="contained"
                color="primary"
                className="col-span-1 gap-1 h-8"
              >
                <ContentPasteSearchIcon />
                Buscar
              </Button>
              <Button
                variant="contained"
                color="success"
                className="col-span-1 gap-1 h-8"
              >
                <IoIosSave />
                Guardar
              </Button>

              <Button
                variant="contained"
                color="inherit"
                className="col-span-1 gap-1 h-8"
                onClick={PrintReport}
              >
                <FaPrint />
                Imprimir
              </Button>
            </div>
          </div>
          <div>
            <MUIDataTable
    title={"COTIZACIÓN #: "+cotizacion}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
          <div
            className="grid grid-rows-3 mt-4 
         "
          >
            <div className="grid grid-cols-8 justify-end  ">
              <div className="  col-span-6 "></div>
              <Typography
                fontSize={18}
                fontWeight="bold"
                className="border-b-2 border-gray-400  text-end p-2"
              >
                Subtotal
              </Typography>
              <Typography
                fontSize={18}
                className="border-b-2 border-gray-400  text-end p-2 "
              >
                $524.50
              </Typography>
            </div>
            <div className="grid grid-cols-8 ">
              <div className=" col-span-6 "></div>
              <Typography
                fontSize={18}
                fontWeight="bold"
                className="border-b-2 border-gray-400 text-end p-2"
              >
                IVA 12%
              </Typography>
              <Typography
                fontSize={18}
                className="border-b-2 border-gray-400  text-end p-2"
              >
                $62.94
              </Typography>
            </div>
            <div className="grid grid-cols-8 ">
              <div className=" col-span-6 "></div>
              <Typography
                fontSize={18}
                fontWeight="bold"
                className="border-b-2 border-gray-400  text-end p-2 bg-yellow-200"
              >
                Total
              </Typography>
              <Typography
                fontSize={18}
                className="border-b-2 border-gray-400 text-end p-2 bg-yellow-200"
              >
                $125874.44
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cotizaciones;
