import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      
      <nav>
        <ul>
        <li><Link to="/dashboard/">Sold</Link></li>
          <li><Link to="/dashboard/product-form">Your link and .</Link></li>
          <li><Link to="/dashboard/product-table">Your link and .</Link></li>
          <li><Link to="/dashboard/product-management">Your link and .</Link></li>
          <li><Link to="/dashboard/order-status">Your link and .</Link></li>
          <li><Link to="/dashboard/Customer-List">New Order</Link></li>
        </ul>
      </nav>
  </div>
  );
};

export default Navbar;
