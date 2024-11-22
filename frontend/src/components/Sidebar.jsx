import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const hideSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      <button className="burger" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <h3>Admin</h3>
        <nav>
          <ul>
            <li><Link to="/" onClick={hideSidebar}>Home</Link></li>
            <li><Link to="/dashboard/" onClick={hideSidebar}>Dashboard</Link></li>
            <li><Link to="/dashboard/product-form" onClick={hideSidebar}>Add Product</Link></li>
            <li><Link to="/dashboard/product-table" onClick={hideSidebar}>Product List</Link></li>
            <li><Link to="/dashboard/product-management" onClick={hideSidebar}>Manage Products</Link></li>
            <li><Link to="/dashboard/banner-management" onClick={hideSidebar}>Update Banner</Link></li>
            <li><Link to="/dashboard/order-status" onClick={hideSidebar}>Order status</Link></li>
            <li><Link to="/dashboard/Customer-List" onClick={hideSidebar}>Customer List</Link></li>
            <li><Link to="/dashboard/test-form" onClick={hideSidebar}>Test Form</Link></li>
          </ul>
        </nav>
        <div className="logout">
          <Link to="/logout" onClick={hideSidebar}>Logout</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
