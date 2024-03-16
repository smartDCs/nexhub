import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rutes from "./routes/Rutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="principal">
          <div>
            <Navbar />
          </div>

          <div>
            <Sidebar />
          </div>

          <div className="workArea ">
            <Rutes />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
