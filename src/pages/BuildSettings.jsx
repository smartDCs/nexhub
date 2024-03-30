import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import MUIDataTable from "mui-datatables";


function BuildSettings() {
  const options = ["Presidente", "Secretario", "Tesorero","Vocal"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const columns = [
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "cargo",
      label: "Función",
    },
    {
      name: "contacto",
      label: "Contacto",
    },
  ];

  const data = [
    { name: "Joe James", cargo: "Presidente", contacto: "ejemplo@ejemplo.com" },
    {
      name: "John Walsh",
      cargo: "Secretario",
      contacto: "ejemplo@ejemplo.com",
    },
    { name: "Bob Herm", cargo: "Tesorero", contacto: "ejemplo@ejemplo.com" },
    {
      name: "James Houston",
      cargo: "Vocal",
      contacto: "ejemplo@ejemplo.com",
    },
  ];
  const Tableoptions = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
  };
  return (
    <>
      <Card variant="outlined" className="m-1 mainCard">
        <CardContent className="m-1 grid  grid-cols-12 gap-2 ">
          <div className="  col-span-8">
            <div className="cardTable">
              <MUIDataTable
                title={"Miembros de la junta administrativa"}
                data={data}
                columns={columns}
                options={Tableoptions}
                  />
            </div>
          </div>
          <div className=" col-span-4 ">
            <form className="formAdministrativa">
              <h1>AGREGAR MIEMBRO DE LA JUNTA ADMINISTRATIVA</h1>
              <div className="grid grid-cols-7 gap-x-0">
                <div className="grid grid-rows-2 col-span-7 m-4 gap-3">
                  <TextField label="Nombres y Apellidos" variant="standard" className="TextField"/>
                  <TextField label="Email" variant="standard" className="TextField "/>
                </div>

                <div className="grid  col-span-7 ml-4 mr-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <TextField
                      label="Celular 1"
                      variant="standard"
                      className=" col-span-1 TextField"
                    />
                    <TextField
                      label="Celular 2"
                      variant="standard"
                      className=" col-span-1 TextField"
                    />
                  </div>
                  <div >
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200, paddingTop:5 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Función" className="TextField"/>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <button className="bg-green-600 text-white m-4 btnGuardar">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default BuildSettings;
