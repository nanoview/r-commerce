import React from "react";
import Navbar from "../components/homeNavbar"; // Updated import paths for clarity
import Banner from "./Banner";
import MiddleSpace from "./MiddleSpace";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      <MiddleSpace />
      <ProductList />
    </div>
  );
};

export default Home;