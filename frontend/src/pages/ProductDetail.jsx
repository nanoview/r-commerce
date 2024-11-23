import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://localhost:5000/api/products`;
        console.log("Request URL:", url);
        const response = await axios.get(url);
        console.log("Products data:", response.data);
        const matchedProduct = response.data.find((p) => p._id === id);
        if (matchedProduct) {
          setProduct(matchedProduct);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.photo ? `http://localhost:5000/uploads/${product.photo}` : product.photoUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
