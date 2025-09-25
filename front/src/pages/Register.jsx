import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ... tus datos de regiones y comunas igual

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    id_region: "",
    id_comuna: "",
    telefono: "",
    email: "",
    confirmar_email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [comunas, setComunas] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setFormData({ ...formData, id_region: regionId, id_comuna: "" });
    setComunas(regionId ? comunasEjemplo[regionId] || [] : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.rut) newErrors.rut = "El RUT es obligatorio";
    if (!formData.apellido_paterno) newErrors.apellido_paterno = "El apellido paterno es obligatorio";
    if (!formData.apellido_materno) newErrors.apellido_materno = "El apellido materno es obligatorio";
    if (!formData.fecha_nacimiento) newErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria";
    if (!formData.id_region) newErrors.id_region = "La región es obligatoria";
    if (!formData.id_comuna) newErrors.id_comuna = "La comuna es obligatoria";
    if (!formData.telefono) newErrors.telefono = "El teléfono es obligatorio";
    if (!formData.email) newErrors.email = "El correo electrónico es obligatorio";
    if (!formData.confirmar_email) newErrors.confirmar_email = "Confirma tu correo electrónico";
    if (formData.email && formData.confirmar_email && formData.email !== formData.confirmar_email) newErrors.confirmar_email = "Los correos no coinciden";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    if (!formData.confirm_password) newErrors.confirm_password = "Confirma tu contraseña";
    if (formData.password && formData.confirm_password && formData.password !== formData.confirm_password) newErrors.confirm_password = "Las contraseñas no coinciden";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      await axios.post("/api/auth/register", {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
        // ...otros campos si tu backend lo requiere
      });
      setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error al registrar usuario");
    } finally {
      setSubmitting(false);
    }
  };

  // ...el handleFechaChange igual

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white">
      {/* Panel Izquierdo */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white py-8 px-4 sm:px-8 min-h-[60vh]">
        {/* ...logo y títulos igual */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
            {message && (
              <div className="sm:col-span-6">
                <p className={`text-xs h-5 mt-1 ${message.includes("exitoso") ? "text-green-500" : "text-red-500"}`}>{message}</p>
              </div>
            )}
            {/* Nombre */}
            <div className="sm:col-span-3">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-700">Nombre</label>
              <div className="mt-2">
                <input type="text" name="nombre" id="nombre" autoComplete="nombre"
                  disabled={submitting}
                  aria-label="Nombre"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ingresa tu nombre"
                  className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ..."
                />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.nombre || "\u00A0"}</p>
            </div>
            {/* ...los demás campos igual, añade disabled={submitting} y aria-label donde corresponda... */}
            {/* Región */}
            <div className="sm:col-span-3">
              <label htmlFor="id_region" className="block text-sm font-medium leading-6 text-gray-700">Región</label>
              <div className="mt-2">
                <select
                  id="id_region"
                  name="id_region"
                  value={formData.id_region}
                  onChange={handleRegionChange}
                  aria-label="Seleccione una región"
                  className="p-2 block w-full rounded-md border ..."
                  disabled={submitting}
                >
                  <option value="">Seleccione una región</option>
                  {regionesEjemplo.map(region => (
                    <option key={region.id_region} value={region.id_region}>{region.nombre}</option>
                  ))}
                </select>
              </div>
              <p className="text-red-500 text-xs mt-1">{errors.id_region || "\u00A0"}</p>
            </div>
            {/* ...resto igual */}
          </div>
          <div className="text-center">
            <button
              style={{ width: "50%" }}
              type="submit"
              className="bg-black text-white p-2 rounded-md hover:bg-gray-800 ..."
              disabled={submitting}
              aria-label="Registrar"
            >
              {submitting ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-400 text-center w-full max-w-md mx-auto px-4 sm:px-8">
          <p>¿Ya posees cuenta?{" "}
            <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>Iniciar Sesión</button>
          </p>
        </div>
      </div>
      {/* Panel Derecho: Imagen de fondo */}
      <div className="hidden md:block w-full lg:w-1/2 h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Fondo registro"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
