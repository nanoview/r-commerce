import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product, loading }) => {
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <div className="product-card loading">
        <div className="image-placeholder"></div>
        <div className="text-placeholder"></div>
        <div className="text-placeholder"></div>
      </div>
    );
  }

  const isLongImage = product.imageSize === "long";

  return (
    <div className={`product-card ${isLongImage ? "long" : ""}`}>
      <div className="product-image-container" onClick={handlePhotoClick}>
        <img
          src={product.photo ? `http://192.168.1.237:5000/uploads/${product.photo}` : product.photoUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;