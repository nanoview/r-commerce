import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "../styles/ProductList.css";
import { baseURL } from "../utils/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const response = await axios.get(`${baseURL}/api/products`); // Replace with your API endpoint
        console.log("🚀 ~ fetchProducts ~ response:", response)
        console.log("Fetched products:", response.data); // Debugging: Log fetched products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Your product list appear here</h3>
      <div className="product-list">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ProductCard key={index} loading={true} />
          ))
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;