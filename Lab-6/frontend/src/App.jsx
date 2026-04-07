import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import { fetchProducts, fetchStats, createProduct, updateProduct, deleteProduct, updateStock } from './services/api'

function App() {
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const productsData = await fetchProducts()
    const statsData = await fetchStats()
    setProducts(productsData)
    setStats(statsData)
  }

  const handleSaveProduct = async (formData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData)
    } else {
      await createProduct(formData)
    }
    loadData()
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id)
      loadData()
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleStockUpdate = async (id, change) => {
    await updateStock(id, change)
    loadData()
  }

  return (
    <div>
      <h1>Stock Management System</h1>

      <div>
        <button onClick={() => setShowForm(true)}>Add Product</button>
        <button onClick={loadData}>Refresh</button>
      </div>

      <Dashboard stats={stats} />

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onStockUpdate={handleStockUpdate}
      />
    </div>
  )
}

export default App