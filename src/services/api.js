const API_BASE_URL = 'http://localhost:3001/api';

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
