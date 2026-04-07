import axios from 'axios'

const API = 'http://localhost:8000/api'

export const fetchProducts = () => axios.get(`${API}/products/`).then(res => res.data)
export const fetchStats = () => axios.get(`${API}/dashboard/`).then(res => res.data)
export const createProduct = (data) => axios.post(`${API}/products/`, data).then(res => res.data)
export const updateProduct = (id, data) => axios.put(`${API}/products/${id}/`, data).then(res => res.data)
export const deleteProduct = (id) => axios.delete(`${API}/products/${id}/`)
export const updateStock = (id, quantity) => axios.post(`${API}/products/${id}/stock/`, { quantity }).then(res => res.data)