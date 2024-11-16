import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import ProductComponent from "./components/ProductComponent";
import LogoutComponent from "./components/LogoutComponent";
import Home from "./pages/Home";
import "./styles/GlobalStyles.css"; // Updated to use the combined styles

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/admin" element={<AuthComponent setToken={setToken} />} />
          <Route
            path="/dashboard/*"
            element={<ProductComponent token={token} />}
          />
          <Route
            path="/logout"
            element={<LogoutComponent setToken={setToken} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
