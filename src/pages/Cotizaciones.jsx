import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { MdEditDocument } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { IoIosSave } from "react-icons/io";
function Cotizaciones() {
  const [cotizacion, setCotizacion] = useState(22);
  return (
    <div className="grid grid-cols-1 m-9">
      <Card variant="elevation">
        <CardContent>
          <div className="text-red-900 flex justify-end">
            <Typography fontSize={26}>
              <MdEditDocument className="mr-4" />
            </Typography>
            <Typography>COTIZACIÓN #: {cotizacion}</Typography>
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
            <TextField
              variant="standard"
              label="Dirección:"
              className="col-span-2"
            />
            <TextField
              variant="standard"
              label="E-mail:"
              className="col-span-2"
            />
          </div>
          <div className="mt-4 QuoteDetail">
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
              >
                <FaPrint />
                Imprimir
              </Button>
            </div>
          </div>
        
        </CardContent>
      </Card>
    </div>
  );
}

export default Cotizaciones;
