//Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import ProductManagement from './ProductManagement';
import BannerForm from './BannerForm';
import Form from './testForm';
import DefaultDashboardContent from './DefaultDashboardContent';
import "../styles/Dashboard.css"; 

const Dashboard = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', description: '', photo: '' });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/admin'); // Redirect to login if no token
    } else {
      fetchProducts(storedToken);
      startInactivityTimer();
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get('http://192.168.1.237:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin'); // Redirect to login if unauthorized
      }
    }
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://192.168.1.237:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', quantity: '', description: '', photo: '' });
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://192.168.1.237:5000/api/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.map(product => (product._id === id ? response.data : product)));
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://192.168.1.237:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  const startInactivityTimer = () => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/admin'); // Redirect to login after inactivity
      }, 15 * 60 * 1000); // 15 minutes
    };

    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.ontouchstart = resetTimer;
    window.ontouchmove = resetTimer;
    window.onclick = resetTimer; // catches touchpad clicks
    window.onkeypress = resetTimer;
  };

  return (
    <div className="dashboard">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />
      <div className={`main-content ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
        <AdminNavbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<DefaultDashboardContent />} />
            <Route path="product-form" element={<ProductForm newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} />} />
            <Route path="product-table" element={<ProductTable products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
            <Route path="banner-management" element={<BannerForm />} />
            <Route path="test-form" element={<Form/>} />
            <Route path="product-management" element={<ProductManagement products={products} newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
