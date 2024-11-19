import React from "react";
import Navbar from "./pages/homeNavbar"; // Updated import paths for clarity
import Banner from "./pages/Banner";
import Filters from "./pages/Filters";
import ProductList from "./pages/ProductList";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      <Filters />
      <ProductList />
    </div>
  );
};

export default Home;
