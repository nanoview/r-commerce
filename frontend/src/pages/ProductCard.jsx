import React from "react";

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
      <img src={`http://localhost:5000/uploads/${product.photo}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
