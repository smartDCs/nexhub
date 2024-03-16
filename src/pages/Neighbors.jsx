import { Card, CardContent } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";

import MUIDataTable from "mui-datatables";
function Neighbors() {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const data = [
    { name: "Joe Jhonson James", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
    {
      name: "James Houston",
      company: "Test Corp",
      city: "Dallas",
      state: "TX",
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    rowHover:true,
    
    onRowClick: (data) => {           
      
      console.log(data);        
      console.log(data[0]+data[3])   
  }
  };

  return (
    <>
      <Card variant="outlined" className="m-1 mainCard">
        <CardContent className="m-1 grid  grid-cols-12 gap-2 ">
          <div className="  col-span-8">
            <div className="cardTable">
              <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
               
              />
            </div>
          </div>
          <div className=" col-span-4 ">
            <form className="formNeighbor">
              <h1>AGREGAR VECINO</h1>
              <div className="grid grid-cols-7 gap-x-0">
                <div className="grid grid-rows-2 col-span-7 m-4">
                  <TextField label="Nombres y Apellidos" variant="standard" />
                  <TextField label="Email" variant="standard" />
                </div>

                <div className="grid  col-span-7 ml-4 mr-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <TextField
                      label="# Casa/Depto."
                      variant="standard"
                      className=" col-span-1"
                    />
                    <TextField
                      label="C.I."
                      variant="standard"
                      className=" col-span-1"
                    />

                    <TextField
                      label="Celular 1"
                      variant="standard"
                      className=" col-span-1"
                    />
                    <TextField
                      label="Celular 2"
                      variant="standard"
                      className=" col-span-1"
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

export default Neighbors;
