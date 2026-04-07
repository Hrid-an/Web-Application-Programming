import React from 'react'

const StockControl = ({ product, onStockUpdate }) => {
    const handleDecrease = () => {
        onStockUpdate(product.id, -1)
    }

    const handleIncrease = () => {
        onStockUpdate(product.id, 1)
    }

    return (
        <div>
            <button onClick={handleDecrease}>-</button>
            <span> {product.quantity} </span>
            <button onClick={handleIncrease}>+</button>
        </div>
    )
}

export default StockControl