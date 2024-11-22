import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../styles/Form.css';

const ProductForm = ({ newProduct, setNewProduct, addProduct }) => {
  const [photoLink, setPhotoLink] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false); // Track upload state
  const [successMessage, setSuccessMessage] = useState(''); // Track success message
  const fileInputRef = useRef(); // Reference to the file input element
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setUploadingFile(true); // Set flag for uploaded file
  };

  const handleLinkChange = (e) => {
    setPhotoLink(e.target.value);
    setUploadingFile(false); // Set flag for external link
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent duplicate submissions

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('description', data.description);

    if (uploadingFile) { // Handle uploaded file
      formData.append('photo', photoFile);
    } else if (photoLink) { // Handle external link
      formData.append('photoUrl', photoLink);
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
      reset(); // Reset form fields
      setPhotoFile(null);
      setPhotoLink('');
      setUploadingFile(false);
      addProduct(response.data); // Add new product to the list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <label>
        Name:
        <input type="text" {...register('name', { required: true })} />
      </label>
      <label>
        Price:
        <input type="number" {...register('price', { required: true })} />
      </label>
      <label>
        Quantity:
        <input type="number" {...register('quantity', { required: true })} />
      </label>
      <label>
        Description:
        <textarea {...register('description')} />
      </label>
      <label>
        Image from device:
        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
      </label>
      <label>
        Image URL:
        <input type="text" value={photoLink} onChange={handleLinkChange} />
      </label>
      {photoFile && <img src={URL.createObjectURL(photoFile)} alt="Preview" className="thumbnail" />}
      {photoLink && <img src={photoLink} alt="Preview" className="thumbnail" onError={(e) => e.target.style.display = 'none'} />}
      <button type="submit" disabled={isSubmitting}>Add Product</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  );
};

export default ProductForm;
