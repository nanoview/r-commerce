import React from "react";
import { Link } from "react-router-dom";


const ProductCard = ({ product, loading }) => {
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

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
          <img src={product.photo ? `http://localhost:5000/uploads/${product.photo}` : product.photoUrl} alt={product.name} />
      </Link>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
