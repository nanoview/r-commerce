import React, { useState, useEffect } from "react";
import "../styles/Banner.css"; // CSS for styling and animations
import axios from "axios";

const Banner = () => {
  const [banner, setBanner] = useState({
    heading: "",
    buttonText: "",
    image: "",
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get("/api/banner");
        setBanner(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="banner">
      <div className="banner-content animate-text">
        <h2>{banner.heading || "Default Heading"}</h2>
        <button>{banner.buttonText || "Default Button"}</button>
      </div>
      <div className="banner-image animate-image">
        <img
          src={
            banner.image ||
            "https://via.placeholder.com/800x400?text=Default+Banner+Image"
          }
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Banner;
