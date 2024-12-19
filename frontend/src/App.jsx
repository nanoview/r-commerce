import React, { useMemo, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AuthComponent from './components/AuthComponent';
import Dashboard from './components/Dashboard';
import LogoutComponent from './components/LogoutComponent';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

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
        <Footer />
      </div>
    </Router>
  );
};

export default App;
