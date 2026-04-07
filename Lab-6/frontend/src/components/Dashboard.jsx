import React from 'react'

const Dashboard = ({ stats }) => {
    return (
        <div>
            <h3>Dashboard</h3>
            <p>Total Products: {stats.total_products || 0}</p>
            <p>Total Value: Rs {stats.total_value || 0}</p>
            <p>Low Stock Items: {stats.low_stock || 0}</p>
        </div>
    )
}

export default Dashboard