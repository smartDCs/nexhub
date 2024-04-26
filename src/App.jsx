
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rutes from "./routes/Rutes";
import UserState from "./context/User/UserState";
function App() {
  return (
    <UserState>
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
    </UserState>
  );
}

export default App;
