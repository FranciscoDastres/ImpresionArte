import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { 
  User, 
  ShoppingCart, 
  Package, 
  Calendar,
  MapPin,
  Phone,
  Edit,
  Eye,
  X
} from "lucide-react";

const ClientPanel = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nombre: "",
    telefono: "",
    direccion: ""
  });

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      setLoading(true);
      const [profileRes, ordersRes] = await Promise.all([
        api.get("/client/perfil"),
        api.get("/client/pedidos")
      ]);

      setProfile(profileRes.data);
      setOrders(ordersRes.data);
      setProfileForm({
        nombre: profileRes.data.nombre,
        telefono: profileRes.data.telefono || "",
        direccion: profileRes.data.direccion || ""
      });
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/client/perfil", profileForm);
      setProfile(response.data);
      setEditingProfile(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("¿Estás seguro de que quieres cancelar este pedido?")) {
      return;
    }

    try {
      await api.put(`/client/pedidos/${orderId}/cancelar`);
      loadClientData(); // Recargar datos
    } catch (error) {
      console.error("Error cancelando pedido:", error);
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

  const getStatusText = (status) => {
    const texts = {
      pendiente: "Pendiente",
      confirmado: "Confirmado",
      en_proceso: "En Proceso",
      enviado: "Enviado",
      entregado: "Entregado",
      cancelado: "Cancelado"
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tu panel...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">
                Mi Panel de Cliente
              </h1>
              <p className="text-gray-600">
                Bienvenido, {user?.nombre} ({user?.email})
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Cliente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "profile", name: "Mi Perfil", icon: User },
              { id: "orders", name: "Mis Pedidos", icon: ShoppingCart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Tab */}
        {activeTab === "profile" && profile && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Información Personal</h3>
                {!editingProfile && (
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Editar</span>
                  </button>
                )}
              </div>
              
              {editingProfile ? (
                <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={profileForm.nombre}
                      onChange={(e) => setProfileForm({...profileForm, nombre: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="tel"
                      value={profileForm.telefono}
                      onChange={(e) => setProfileForm({...profileForm, telefono: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <textarea
                      value={profileForm.direccion}
                      onChange={(e) => setProfileForm({...profileForm, direccion: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProfile(false);
                        setProfileForm({
                          nombre: profile.nombre,
                          telefono: profile.telefono || "",
                          direccion: profile.direccion || ""
                        });
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nombre</p>
                      <p className="text-lg text-gray-900">{profile.nombre}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="text-lg text-gray-900">{profile.telefono || "No especificado"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Dirección</p>
                      <p className="text-lg text-gray-900">{profile.direccion || "No especificada"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Miembro desde</p>
                      <p className="text-lg text-gray-900">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Mis Pedidos</h3>
              </div>
              
              {orders.length === 0 ? (
                <div className="p-6 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes pedidos aún</p>
                  <p className="text-sm text-gray-400 mt-2">
                    ¡Explora nuestros productos y realiza tu primera compra!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Pedido #{order.id}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.estado)}`}>
                            {getStatusText(order.estado)}
                          </span>
                          {order.estado === "pendiente" && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Cancelar pedido"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.items && order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                            <img
                              src={item.producto.imagen_principal}
                              alt={item.producto.titulo}
                              className="h-12 w-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.producto.titulo}</p>
                              <p className="text-sm text-gray-500">
                                Cantidad: {item.cantidad} × ${item.precio_unitario}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">${item.subtotal}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-900">Total</span>
                          <span className="text-xl font-bold text-gray-900">${order.total}</span>
                        </div>
                        
                        {order.direccion_envio && (
                          <div className="mt-2 text-sm text-gray-600">
                            <strong>Dirección de envío:</strong> {order.direccion_envio}
                          </div>
                        )}
                        
                        {order.telefono_contacto && (
                          <div className="mt-1 text-sm text-gray-600">
                            <strong>Teléfono:</strong> {order.telefono_contacto}
                          </div>
                        )}
                        
                        {order.notas && (
                          <div className="mt-2 text-sm text-gray-600">
                            <strong>Notas:</strong> {order.notas}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPanel;
