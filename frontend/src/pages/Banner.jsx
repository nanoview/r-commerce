import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/Banner.css';

const Banner = ({ backURL }) => {
  const [banner, setBanner] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonPosition, setButtonPosition] = useState({ x: 100, y: 100 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(`${backURL}/api/banner`);
        const data = await response.json();
        setBanner(data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [backURL]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = 300;

      const createSmoke = (x, y) => {
        ctx.fillStyle = `rgba(200, 200, 200, 0.5)`;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fill();

        setTimeout(() => {
          ctx.clearRect(x - 30, y - 30, 60, 60);
        }, 500);
      };

      const handleAnimation = () => {
        createSmoke(buttonPosition.x, buttonPosition.y);
      };

      const interval = setInterval(handleAnimation, 200);
      return () => clearInterval(interval);
    }
  }, [buttonPosition]);

  const moveButton = () => {
    setButtonPosition((prev) => ({
      x: (prev.x + 50) % window.innerWidth,
      y: prev.y,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="banner">
      <canvas ref={canvasRef} className="smoke-canvas" />
      <div className="banner-content">
        <h2>{banner.heading || "Order Now"}</h2>
        <p>
          {banner.description ||
            "Get your favorite products delivered to your doorstep."}
        </p>
        <button
          className="smoke-trail-button"
          style={{
            position: 'absolute',
            left: buttonPosition.x,
            top: buttonPosition.y,
          }}
          onClick={moveButton}
        >
          {banner.buttonText || "Hurry Up"}
        </button>
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
