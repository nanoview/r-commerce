import React, { useState, useMemo, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles/GlobalStyles.css"; // Updated to use the combined styles

// Lazy load components
const AuthComponent = lazy(() => import("./components/AuthComponent"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const LogoutComponent = lazy(() => import("./components/LogoutComponent"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Home = lazy(() => import("./Home"));

const App = () => {
  const [token, setToken] = useState(() => localStorage?.getItem("token") || "");

  const isAuthenticated = useMemo(() => {
    return !!localStorage.getItem("token");
  }, [token]);

  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AuthComponent setToken={setToken} />} />
            <Route
              path="/dashboard/*"
              element={isAuthenticated ? <Dashboard token={token} /> : <Navigate to="/" />}
            />
            <Route path="/logout" element={<LogoutComponent setToken={setToken} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
