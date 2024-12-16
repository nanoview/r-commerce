import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseURL } from "../utils/api";

const ProductCard = ({ product, loading }) => {
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return (
      <div className="product-card skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
      </div>
    );
  }

  const productImage = (
    <img
      src={product.photo ? `${baseURL}/uploads/${product.photo}` : product.photoUrl}
      alt={product.name}
      onClick={handlePhotoClick}
    />
  );

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        {productImage}
      </Link>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
