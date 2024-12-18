import React, { useState, useEffect } from 'react';
import '../styles/ProductTable.css';
import '../styles/Modal.css';

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  const [modalState, setModalState] = useState({
    selectedProduct: null,
    updatedProduct: {},
    newImage: null,
    imageUrl: '',
    isOpen: false,
  });
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = (product) => {
    setModalState({
      selectedProduct: product,
      updatedProduct: { ...product },
      newImage: null,
      imageUrl: product.photoUrl || '',
      isOpen: true,
    });
  };

  const handleInputChange = (e, field) => {
    setModalState((prevState) => ({
      ...prevState,
      updatedProduct: {
        ...prevState.updatedProduct,
        [field]: e.target.value,
      },
    }));
  };

  const handleImageChange = (e) => {
    setModalState((prevState) => ({
      ...prevState,
      newImage: e.target.files[0],
    }));
  };

  const handleSave = async () => {
    const { selectedProduct, updatedProduct, newImage, imageUrl } = modalState;

    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.quantity) {
      alert('Name, price, and quantity are mandatory fields!');
      return;
    }

    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('price', updatedProduct.price);
    formData.append('quantity', updatedProduct.quantity);
    formData.append('description', updatedProduct.description);
    formData.append('imageSize', updatedProduct.imageSize);
    if (newImage) formData.append('photo', newImage);
    formData.append('photoUrl', imageUrl);

    try {
      await updateProduct(selectedProduct._id, formData);
      setModalState({ selectedProduct: null, updatedProduct: {}, newImage: null, imageUrl: '', isOpen: false });
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className='product-table-container'>
      {successMessage && <div className='success-message'>{successMessage}</div>}
      <table className='product-table'>
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
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>
                <img
                  className='product-image'
                  src={product.photo ? `http://192.168.1.237:5000/uploads/${product.photo}` : product.photoUrl}
                  alt={product.name}
                  onError={(e) => (e.target.src = '/path-to-placeholder.png')}
                />
              </td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td className='actions'>
                <button onClick={() => openModal(product)}>Edit</button>
              </td>
              <td className='actions'>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalState.isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type='text'
                value={modalState.updatedProduct.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </label>
            <label>
              Description:
              <input
                type='text'
                value={modalState.updatedProduct.description}
                onChange={(e) => handleInputChange(e, 'description')}
              />
            </label>
            <label>
              Price:
              <input
                type='number'
                value={modalState.updatedProduct.price}
                onChange={(e) => handleInputChange(e, 'price')}
              />
            </label>
            <label>
              Quantity:
              <input
                type='number'
                value={modalState.updatedProduct.quantity}
                onChange={(e) => handleInputChange(e, 'quantity')}
              />
            </label>
            <label>
              Image Size:
              <select
                value={modalState.updatedProduct.imageSize}
                onChange={(e) => handleInputChange(e, 'imageSize')}
              >
                <option value='short'>Short</option>
                <option value='long'>Long</option>
              </select>
            </label>
            <label>
              Image from device:
              <input type='file' accept='image/*' onChange={handleImageChange} />
            </label>
            <label>
              Image URL:
              <input
                type='text'
                value={modalState.imageUrl}
                onChange={(e) =>
                  setModalState((prevState) => ({ ...prevState, imageUrl: e.target.value }))
                }
              />
            </label>
            {modalState.newImage && (
              <img src={URL.createObjectURL(modalState.newImage)} alt='Preview' width='150' />
            )}
            {modalState.imageUrl && (
              <img
                src={modalState.imageUrl}
                alt='Preview'
                width='150'
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <div className='modal-actions'>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setModalState({ ...modalState, isOpen: false })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
