import React from "react";
import Navbar from "./Navbar"; // Updated import paths for clarity
import Banner from "./Banner";
import Filters from "./Filters";
import ProductList from "./ProductList";

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
