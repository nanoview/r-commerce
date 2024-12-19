import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/homeNavbar";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.237:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-image">
            <img
              src={
                product.photo
                  ? `http://192.168.1.237:5000/uploads/${product.photo}`
                  : product.photoUrl
              }
              alt={product.name}
            />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
