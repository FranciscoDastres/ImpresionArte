// URL base de la API - en local usarás VITE_API_URL, en producción usa tu dominio de Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://impresion-arte.vercel.app/api';

// Instancia de axios para peticiones autenticadas
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Obtener todos los productos
  static async getProductos() {
    const res = await fetch(`${API_BASE_URL}/productos`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
  }

  // Obtener producto por ID
  static async getProductoPorId(id) {
    const res = await fetch(`${API_BASE_URL}/producto?id=${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
  }

  // Obtener productos por categoría
  static async getProductosPorCategoria(categoria) {
    const res = await fetch(`${API_BASE_URL}/productosPorCategoria?categoria=${encodeURIComponent(categoria)}`);
    if (!res.ok) throw new Error("Error al obtener productos por categoría");
    return res.json();
  }

  // Obtener todas las categorías
  static async getCategorias() {
    const res = await fetch(`${API_BASE_URL}/categorias`);
    if (!res.ok) throw new Error("Error al obtener categorías");
    return res.json();
  }

  // Obtener productos populares
  static async getProductosPopulares() {
    const res = await fetch(`${API_BASE_URL}/productosPopulares`);
    if (!res.ok) throw new Error("Error al obtener productos populares");
    return res.json();
  }

  // Buscar productos por título
  static async buscarProductos(query) {
    const res = await fetch(`${API_BASE_URL}/buscarProductos?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Error al buscar productos");
    return res.json();
  }
}

export default ApiService;
