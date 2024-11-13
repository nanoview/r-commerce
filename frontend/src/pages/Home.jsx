import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Filters />
      <ProductList />
    </div>
  );
};

export default Home;
