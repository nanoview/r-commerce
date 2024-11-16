import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import Dashboard from "./components/Dashboard";
import LogoutComponent from "./components/LogoutComponent";
import Navbar from "./pages/Navbar";
import Banner from "./pages/Banner";
import ProductList from "./pages/ProductList";
import "./components/Styles.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AuthComponent setToken={setToken} />} />
        <Route path="/dashboard/*" element={<Dashboard token={token} />} />
        <Route path="/logout" element={<LogoutComponent setToken={setToken} />} />
        <Route path="/" element={
          <div className="app">
            <Navbar />
            <Banner />
            <ProductList />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
