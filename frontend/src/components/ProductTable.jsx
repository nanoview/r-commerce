import React from 'react';
import '../styles/ProductTable.css';

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>In Stock</th>
          <th>Sold Out</th>
          <th>Delivered</th>
          <th>Pending Del</th>
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
            <img src={product.photo} alt={product.name} width="150" height="50" />
            </td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.quantity}</td>
            <td>{product.quantity}</td>
            <td>{product.quantity}</td>
            <td className="actions">
              <button onClick={() => updateProduct(product._id, { name: 'Updated Name', price: product.price, quantity: product.quantity })}>Update</button>
            </td>
            <td className="actions">
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
