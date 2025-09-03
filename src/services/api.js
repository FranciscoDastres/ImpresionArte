// URL base de la API - cambiar en producción
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://impresion-arte.vercel.app/api';

// Función para obtener headers con token
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Instancia de axios para peticiones autenticadas
import axios from 'axios';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
  (error) => {
    return Promise.reject(error);
  }
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
    try {
      const response = await fetch(`${API_BASE_URL}/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductos:', error);
      throw error;
    }
  }

  // Obtener producto por ID
  static async getProductoPorId(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductoPorId:', error);
      throw error;
    }
  }

  // Obtener productos por categoría
  static async getProductosPorCategoria(categoria) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/categoria/${categoria}`);
      if (!response.ok) {
        throw new Error('Error al obtener productos por categoría');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductosPorCategoria:', error);
      throw error;
    }
  }

  // Obtener todas las categorías
  static async getCategorias() {
    try {
      const response = await fetch(`${API_BASE_URL}/categorias`);
      if (!response.ok) {
        throw new Error('Error al obtener categorías');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCategorias:', error);
      throw error;
    }
  }

  // Obtener productos populares
  static async getProductosPopulares() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/populares`);
      if (!response.ok) {
        throw new Error('Error al obtener productos populares');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductosPopulares:', error);
      throw error;
    }
  }

  // Buscar productos por título
  static async buscarProductos(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/buscar?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en buscarProductos:', error);
      throw error;
    }
  }
}

export default ApiService;
