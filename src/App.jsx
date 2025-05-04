import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Layout from "./pages/Layout";
import Platforms from "./pages/Platforms";
import Dailyactions from "./pages/Dailyactions";
import Customers from "./pages/Customers";
import Finance from "./pages/Finance";
import Setting from "./pages/Setting";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/platforms" element={<Platforms/>} />
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/dailyactions" element={<Dailyactions/>} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/setting" element={<Setting/>}/>
            {/* add more pages here, */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
