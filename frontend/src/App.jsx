import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import ProductComponent from "./components/ProductComponent";
import LogoutComponent from "./components/LogoutComponent";
import Home from "./pages/Home";
import Banner from "./pages/Banner";
import ProductList from "./pages/ProductList";
import "./components/Styles.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AuthComponent setToken={setToken} />} />
        <Route path="/dashboard/*" element={<ProductComponent token={token} />} />
        <Route path="/logout" element={<LogoutComponent setToken={setToken} />} />
        <Route path="/" element={
            <div className="app">
              <Home />
               </div>
          } />
      </Routes>
    </Router>
  );
};

export default App;
