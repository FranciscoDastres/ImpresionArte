import axios from "axios";

// Usa la variable de entorno en local, y en producción toma la default Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://impresion-arte.vercel.app/api";

// Instancia única de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adjuntar token JWT si existe
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API Service, solo los endpoints esenciales del backend
const ApiService = {
  async getProductos() {
    const { data } = await api.get("/productos");
    return data;
  },
  async getProductoPorId(id) {
    const { data } = await api.get(`/productos/${id}`);
    return data;
  },
  async getProductosPorCategoria(categoria) {
    const { data } = await api.get(`/productos/categoria/${encodeURIComponent(categoria)}`);
    return data;
  },
  async getCategorias() {
    const { data } = await api.get("/categorias");
    return data;
  },
  async getProductosPopulares() {
    const { data } = await api.get("/productos/populares");
    return data;
  },
  async buscarProductos(q) {
    const { data } = await api.get(`/productos/buscar?q=${encodeURIComponent(q)}`);
    return data;
  },
  // Si necesitas login/register, puedes agregarlos acá
};

export default ApiService;
export { api };
