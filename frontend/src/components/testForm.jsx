import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/test', formData);
            alert('Product saved successfully');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
            />
            <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Product Price"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
