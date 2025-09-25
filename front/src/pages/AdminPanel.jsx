import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  TrendingUp
} from "lucide-react";

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, usersRes, productsRes, ordersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/usuarios"),
        api.get("/admin/productos"), // corregido el endpoint, si corresponde
        api.get("/admin/pedidos")
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pendiente: "bg-yellow-100 text-yellow-800",
      confirmado: "bg-blue-100 text-blue-800",
      en_proceso: "bg-orange-100 text-orange-800",
      enviado: "bg-purple-100 text-purple-800",
      entregado: "bg-green-100 text-green-800",
      cancelado: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role) => {
    return role === "admin" 
      ? "bg-purple-100 text-purple-800" 
      : "bg-blue-100 text-blue-800";
  };

  // Early return si no es admin
  if (!isAdmin()) {
    return <div className="text-center py-20 text-red-600 font-bold">Acceso denegado.</div>;
  }

  // Manejo visual del error general:
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-700 font-bold text-lg py-8">Error cargando panel admin.<br />{error.message || error.toString()}</div>
        <button onClick={loadDashboardData} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4">Reintentar</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {user?.nombre} ({user?.email})</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">Administrador</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Admin tabs">
            {[
              { id: "dashboard", name: "Dashboard", icon: TrendingUp },
              { id: "users", name: "Usuarios", icon: Users },
              { id: "products", name: "Productos", icon: Package },
              { id: "orders", name: "Pedidos", icon: ShoppingCart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
            {/* Botón recarga */}
            <button onClick={loadDashboardData} className="ml-auto px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Recargar panel</button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            {/* ...igual que tu versión anterior ... */}
            {/* Recent Orders */}
            {/* ...igual ... */}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow" aria-label="Gestión de Usuarios">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h3>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                onClick={() => alert("Función de nuevo usuario en desarrollo")} // ejemplo UX
              >
                <Plus className="h-4 w-4" /><span>Nuevo Usuario</span>
              </button>
            </div>
            {/* Table igual y tabla de usuarios igual ... */}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-white rounded-lg shadow" aria-label="Gestión de Productos">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Gestión de Productos</h3>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                onClick={() => alert("Función de nuevo producto en desarrollo")}
              >
                <Plus className="h-4 w-4" /><span>Nuevo Producto</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {/* ...columnas igual ... */}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={product.imagen_principal}
                              alt={product.titulo}
                              onError={e => { e.target.src = '/images/placeholder.png'; }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.titulo}</div>
                          </div>
                        </div>
                      </td>
                      {/* ...resto igual ... */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {/* ...igual que tenías, puedes agregar filtros como mejora futura ... */}
      </div>
    </div>
  );
};

export default AdminPanel;
