import React, { useState } from "react";
import axios from "axios";
import '../styles/Banner.css';

const BannerForm = () => {
  const [formData, setFormData] = useState({
    heading: "",
    buttonText: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/banner", formData);
      alert("Banner updated successfully!");
      setFormData({ heading: "", buttonText: "", image: "" });
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Heading:
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Button Text:
        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Update Banner</button>
    </form>
  );
};

export default BannerForm;
