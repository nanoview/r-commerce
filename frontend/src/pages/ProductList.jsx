import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/ProductList.css";
import { backURL } from "../utils/api";

const ProductList = ({ }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backURL}/api/products`); // Replace with your API endpoint
        console.log("Fetched products:", response.data); // Debugging: Log fetched products
        setProducts(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Ensure products is an array even on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backURL]);

  return (
    <div className="product-list-container">
      <h3>Please choose which one you want</h3>
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