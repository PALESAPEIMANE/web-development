// Inventory.js

import React, { useState } from 'react';

const Inventory = ({ products, setProducts }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: ''
    });

    const [soldProduct, setSoldProduct] = useState({
        name: '',
        quantity: ''
    });

    const handleAddProduct = (e) => {
        e.preventDefault();
        
        if (!newProduct.name || !newProduct.category || !newProduct.description || !newProduct.price || !newProduct.quantity) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedProducts = [
            ...products,
            {
                ...newProduct,
                price: parseFloat(newProduct.price),
                quantity: parseInt(newProduct.quantity)
            }
        ];

        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setNewProduct({ name: '', category: '', description: '', price: '', quantity: '' });
    };

    const handleSellProduct = (e) => {
        e.preventDefault();
        if (!soldProduct.name || !soldProduct.quantity) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedProducts = products.map(product => {
            if (product.name === soldProduct.name) {
                const updatedQuantity = product.quantity - parseInt(soldProduct.quantity);
                return {
                    ...product,
                    quantity: updatedQuantity < 0 ? 0 : updatedQuantity
                };
            }
            return product;
        });

        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setSoldProduct({ name: '', quantity: '' });  // Reset form
    };

    return (
        <div>
            <h2>Inventory</h2>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct}>
                <h3>Add New Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price (in Rand)"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <button type="submit">Add Product</button>
            </form>

            {/* Sell Product Form */}
            <form onSubmit={handleSellProduct}>
                <h3>Sell Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={soldProduct.name}
                    onChange={e => setSoldProduct({ ...soldProduct, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity to Sell"
                    value={soldProduct.quantity}
                    onChange={e => setSoldProduct({ ...soldProduct, quantity: e.target.value })}
                />
                <button type="submit">Sell Product</button>
            </form>

            {/* Display Current Stock */}
            <h3>Current Stock:</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <strong>{product.name}</strong> (Category: {product.category}) - {product.description} 
                        <br />
                        {product.quantity} in stock at R{product.price.toFixed(2)} each
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;