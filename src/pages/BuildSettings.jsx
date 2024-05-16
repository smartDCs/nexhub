import { Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import MUIDataTable from "mui-datatables";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Select from "react-select";
function BuildSettings() {
  const [nombreEdificio, setNombreEdificio] = useState("Edificio ABC");
  const [direccion, setDireccion] = useState("Av. 123");
  const [fileImg, setFileImg] = useState();
  const options = ["Presidente", "Secretario", "Tesorero", "Vocal"];
  const optionsProyecto = ["Edifcio", "Conjunto residencial"];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [valueProyecto, setValueProyecto] = useState(optionsProyecto[0]);
  const [editar, setEditar] = useState(true);
  const [inputValueP, setInputValueP] = useState("");

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
  /**
   * constante con las opciones del checkbox
   */
  const optionscheck = [
    { value: "bbq", label: "BBQ" },
    { value: "canchas", label: "Canchas deportivas" },
    { value: "spa", label: "SPA" },
    { value: "sala_reuniones", label: "Salón de reuniones" },
    { value: "auditorio", label: "Auditorio" },
  ];

  function handleChange(e) {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  }

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  return (
    <>
      <Card className="m-4 mainCard">
        <CardContent>
          {/**
        Encabezado de la página
         */}
          <div className="grid grid-cols-4 pb-4">
            <div className="col-span-3">
              <Typography variant="h5">{nombreEdificio}</Typography>
              <label style={{ fontSize: "0.7em" }}>
                <strong>Dirección: </strong>
                {direccion}
              </label>
            </div>
            <div className="col-span-1 logoEdificio p-1 ">
              <img src={fileImg} width={"100px"} height={"100px"} />
              <div className="btnCLogo ">
                <label htmlFor="fileInput">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleChange}
                    disabled={editar}
                  />
                  <ImageSearchIcon />
                </label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div>
            <div className="grid grid-cols-12 gap-4">
              <TextField
                variant="standard"
                label="Nombre del proyecto residencial"
                value={nombreEdificio}
                onChange={(e) => setNombreEdificio(e.target.value)}
                className="col-span-6 "
                disabled={editar}
              />
              <TextField
                variant="standard"
                label="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="col-span-6"
                disabled={editar}
              />
            </div>
            <div className="grid grid-cols-12 gap-4 pt-2 ">
              <Autocomplete
                className="col-span-4"
                value={valueProyecto}
                onChange={(event, newValue) => {
                  setValueProyecto(newValue);
                }}
                inputValue={inputValueP}
                onInputChange={(event, newInputValue) => {
                  setInputValueP(newInputValue);
                }}
                options={optionsProyecto}
                size="small"
                disabled={editar}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tipo de proyecto"
                  />
                )}
              />
              <div className="col-span-8 ">
                <div className="grid grid-cols-8 gap-4 ">
                  {inputValueP === "Edifcio" ? (
                    <>
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Departamentos"
                        className="col-span-2"
                        size="small"
                        disabled={editar}
                      />
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Almacenes"
                        className="col-span-2"
                        size="small"
                        disabled={editar}
                      />
                    </>
                  ) : (
                    <>
                      <span className="col-span-2"></span>
                      <TextField
                        variant="standard"
                        type="number"
                        label="# Casas"
                        className="col-span-2"
                        disabled={editar}
                      />
                    </>
                  )}
                  <Select
                    options={optionscheck}
                    isMulti
                    onChange={handleMultiSelectChange}
                    value={selectedOptions}
                    className="col-span-4"
                    isDisabled={editar}
                    
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setEditar(false)}>Editar</Button>
              <Button onClick={() => setEditar(true)}>Guardar</Button>
            </div>
          </div>
          <div className="col-span-8">
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
                  <TextField
                    label="Nombres y Apellidos"
                    variant="standard"
                    className="TextField"
                  />
                  <TextField
                    label="Email"
                    variant="standard"
                    className="TextField "
                  />
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
                  <div>
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
                      sx={{ width: 200, paddingTop: 5 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Función"
                          className="TextField"
                        />
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
