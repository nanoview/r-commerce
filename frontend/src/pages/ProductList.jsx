import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const products = [
  {
    name: "Wireless Earbuds",
    price: 89,
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "AirPods Max",
    price: 559,
    image:
      "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Bose BT Earphones",
    price: 289,
    image:
      "https://images.pexels.com/photos/26832584/pexels-photo-26832584/free-photo-of-close-up-of-a-huawei-smartphone-and-wireless-headphones.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "VIVEFOX Headphones",
    price: 39,
    image:
      "https://media.istockphoto.com/id/1187676340/fi/valokuva/kuulokkeet-ovat-v%C3%A4rilt%C3%A4%C3%A4n-tummat-betonisein%C3%A4%C3%A4-vasten.jpg?s=1024x1024&w=is&k=20&c=JCCkggR9PHntmn3vRQn72PXyEmX4Uz0Sl0mPQ04c0z8=",
  },
];

const ProductList = () => {
  return (
    <div class="container">
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
    </div>
  );
};

export default ProductList;