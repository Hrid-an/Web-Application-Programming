import React from 'react'
import StockControl from './StockControl'

const ProductList = ({ products, onEdit, onDelete, onStockUpdate }) => {
    return (
        <div>
            <h3>Products</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>Rs {product.price}</td>
                            <td>
                                <StockControl
                                    product={product}
                                    onStockUpdate={onStockUpdate}
                                />
                            </td>
                            <td>Rs {product.total_value}</td>
                            <td>
                                <button onClick={() => onEdit(product)}>Edit</button>
                                <button onClick={() => onDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList