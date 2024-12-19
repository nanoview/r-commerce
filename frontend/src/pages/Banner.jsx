import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Banner.css';

const Banner = ({ backURL }) => {
  const [banner, setBanner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get(`${backURL}/api/banner`);
        setBanner(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [backURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="banner">
      <div className="banner-content">
        <h2>{banner.heading || "Order Now"}</h2>
        <p>
          {banner.description ||
            "Get your favorite products delivered to your doorstep."}
        </p>
        <button className="smoke-trail-button">{banner.buttonText || "Hurry Up"}</button>
      </div>
      <div className="banner-image">
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
