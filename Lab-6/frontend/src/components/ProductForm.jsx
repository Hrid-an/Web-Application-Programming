import React, { useState, useEffect } from 'react'

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: 0
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                quantity: product.quantity
            })
        }
    }, [product])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div>
            <h3>{product ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Price: </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Quantity: </label>
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                        required
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default ProductForm