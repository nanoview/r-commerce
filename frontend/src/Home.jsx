import React from "react";
import Navbar from "./components/homeNavbar"; // Updated import paths for clarity
import Banner from "./pages/Banner";
import MiddleSpace  from "./pages/MiddleSpace";
import ProductList from "./pages/ProductList";


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
