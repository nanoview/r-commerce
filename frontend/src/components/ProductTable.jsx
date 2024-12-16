import React, { useState } from 'react';
import '../styles/ProductTable.css';
import '../styles/Modal.css'; // New CSS for modal responsiveness


const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product });
    setImageUrl(product.photoUrl || '');
    setIsModalOpen(true);
  };

  const handleInputChange = (e, field) => {
    setUpdatedProduct({ ...updatedProduct, [field]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('price', updatedProduct.price);
    formData.append('quantity', updatedProduct.quantity);
    if (newImage) formData.append('photo', newImage);
    formData.append('photoUrl', imageUrl);

    try {
      await updateProduct(selectedProduct._id, formData);
      setIsModalOpen(false);
      setNewImage(null);
      setImageUrl('');
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>
                <img className="product-image" src={product.photo ? `http://localhost:5000/uploads/${product.photo}` : product.photoUrl} alt={product.name}  />
              </td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td className="actions">
                <button onClick={() => openModal(product)}>Edit</button>
              </td>
              <td className="actions">
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type="text"
                value={updatedProduct.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={updatedProduct.price}
                onChange={(e) => handleInputChange(e, 'price')}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={updatedProduct.quantity}
                onChange={(e) => handleInputChange(e, 'quantity')}
              />
            </label>
            <label>
              Image from device:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            {newImage && <img src={URL.createObjectURL(newImage)} alt="Preview" width="150" />}
            {imageUrl && <img src={imageUrl} alt="Preview" width="150" onError={(e) => e.target.style.display = 'none'} />}
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
