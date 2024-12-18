import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ProductForm.css';

const ProductForm = ({ addProduct }) => {
  const [data, setData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    imageSize: 'short', // Default value for imageSize
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoLink, setPhotoLink] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setUploadingFile(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('description', data.description);
    formData.append('imageSize', data.imageSize);

    if (uploadingFile) { // Handle uploaded file
      formData.append('photo', photoFile);
      formData.append('photoUrl', 'null');
    } else if (photoLink) { // Handle external link
      formData.append('photoUrl', photoLink);
      formData.append('photo', 'null');
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccessMessage('Product added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
      setData({
        name: '',
        price: '',
        quantity: '',
        description: '',
        imageSize: 'short', // Reset to default value
      });
      setPhotoFile(null);
      setPhotoLink('');
      setUploadingFile(false);
      addProduct(response.data); // Add new product to the list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="product-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageSize">Image Size</label>
          <select
            id="imageSize"
            name="imageSize"
            value={data.imageSize}
            onChange={handleChange}
            required
          >
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoLink">Photo URL</label>
          <input
            type="text"
            id="photoLink"
            name="photoLink"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
