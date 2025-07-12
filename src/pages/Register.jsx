import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const regionesEjemplo = [
  { id_region: 1, nombre: "Región de Arica y Parinacota" },
  { id_region: 2, nombre: "Región de Tarapacá" },
  { id_region: 3, nombre: "Región de Antofagasta" },
  { id_region: 4, nombre: "Región de Atacama" },
  { id_region: 5, nombre: "Región de Coquimbo" },
  { id_region: 6, nombre: "Región de Valparaíso" },
  { id_region: 7, nombre: "Región Metropolitana de Santiago" },
  { id_region: 8, nombre: "Región del Libertador General Bernardo O'Higgins" },
  { id_region: 9, nombre: "Región del Maule" },
  { id_region: 10, nombre: "Región de Ñuble" },
  { id_region: 11, nombre: "Región del Biobío" },
  { id_region: 12, nombre: "Región de La Araucanía" },
  { id_region: 13, nombre: "Región de Los Ríos" },
  { id_region: 14, nombre: "Región de Los Lagos" },
  { id_region: 15, nombre: "Región de Aysén del General Carlos Ibáñez del Campo" },
  { id_region: 16, nombre: "Región de Magallanes y de la Antártica Chilena" },
];

const comunasEjemplo = {
  1: [
    { id_comuna: 1, nombre: "Arica" },
    { id_comuna: 2, nombre: "Camarones" },
    { id_comuna: 3, nombre: "Putre" },
    { id_comuna: 4, nombre: "General Lagos" },
  ],
  2: [
    { id_comuna: 1, nombre: "Iquique" },
    { id_comuna: 2, nombre: "Alto Hospicio" },
    { id_comuna: 3, nombre: "Pozo Almonte" },
  ],
  3: [
    { id_comuna: 1, nombre: "Antofagasta" },
    { id_comuna: 2, nombre: "Calama" },
    { id_comuna: 3, nombre: "Taltal" },
  ],
  4: [
    { id_comuna: 1, nombre: "Copiapó" },
    { id_comuna: 2, nombre: "Tierra Amarilla" },
    { id_comuna: 3, nombre: "Chañaral" },
  ],
  5: [
    { id_comuna: 1, nombre: "La Serena" },
    { id_comuna: 2, nombre: "Coquimbo" },
    { id_comuna: 3, nombre: "Illapel" },
  ],
  6: [
    { id_comuna: 1, nombre: "Valparaíso" },
    { id_comuna: 2, nombre: "Viña del Mar" },
    { id_comuna: 3, nombre: "Quintero" },
  ],
  7: [
    { id_comuna: 1, nombre: "Santiago" },
    { id_comuna: 2, nombre: "Providencia" },
    { id_comuna: 3, nombre: "Las Condes" },
  ],
  8: [
    { id_comuna: 1, nombre: "Rancagua" },
    { id_comuna: 2, nombre: "San Fernando" },
    { id_comuna: 3, nombre: "Santa Cruz" },
  ],
  9: [
    { id_comuna: 1, nombre: "Talca" },
    { id_comuna: 2, nombre: "Cauquenes" },
    { id_comuna: 3, nombre: "Molina" },
  ],
  10: [
    { id_comuna: 1, nombre: "Concepción" },
    { id_comuna: 2, nombre: "Talcahuano" },
    { id_comuna: 3, nombre: "Hualqui" },
  ],
  11: [
    { id_comuna: 1, nombre: "Concepción" },
    { id_comuna: 2, nombre: "Talcahuano" },
    { id_comuna: 3, nombre: "Hualqui" },
  ],
  12: [
    { id_comuna: 1, nombre: "Temuco" },
    { id_comuna: 2, nombre: "Puerto Montt" },
    { id_comuna: 3, nombre: "Osorno" },
  ],
  13: [
    { id_comuna: 1, nombre: "Valdivia" },
    { id_comuna: 2, nombre: "Puerto Varas" },
    { id_comuna: 3, nombre: "La Union" },
  ],
  14: [
    { id_comuna: 1, nombre: "Puerto Montt" },
    { id_comuna: 2, nombre: "Osorno" },
    { id_comuna: 3, nombre: "Puyehue" },
  ],
  15: [
    { id_comuna: 1, nombre: "Coyhaique" },
    { id_comuna: 2, nombre: "Puerto Aysén" },
    { id_comuna: 3, nombre: "Chile Chico" },
  ],
  16: [
    { id_comuna: 1, nombre: "Punta Arenas" },
    { id_comuna: 2, nombre: "Porvenir" },
    { id_comuna: 3, nombre: "Primavera" },
  ],
};

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
  const navigate = useNavigate();

  // Manejar cambio de región
  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    setFormData({ ...formData, id_region: regionId, id_comuna: "" });
    setComunas(regionId ? comunasEjemplo[regionId] || [] : []);
  };

  // Validación simple
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
    try {
      await axios.post("/api/auth/register", {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
      });
      setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage("Error al registrar usuario");
    }
  };

  // Validación de fecha (ejemplo: entre 2024 y 2033)
  const handleFechaChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, fecha_nacimiento: value });
    const fecha = new Date(value);
    const minFecha = new Date("2024-01-01");
    const maxFecha = new Date("2033-12-31");
    if (fecha < minFecha || fecha > maxFecha) {
      setErrors((prev) => ({ ...prev, fecha_nacimiento: "Ingrese una Fecha Válida" }));
    } else {
      setErrors((prev) => {
        const { fecha_nacimiento, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white">
      {/* Panel Izquierdo: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white py-8 px-4 sm:px-8 min-h-[60vh]">
        <div className="w-full max-w-md mx-auto flex flex-col items-start pt-4 sm:pt-8">
          <button className="flex items-center mb-8 group" onClick={() => navigate("/")}>
            <span className="mr-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="24" height="16" rx="3" fill="#2563eb"/>
                <rect x="8" y="12" width="16" height="8" rx="2" fill="#fff"/>
                <rect x="12" y="16" width="8" height="4" rx="1" fill="#2563eb"/>
              </svg>
            </span>
            <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">ImpresionArte</span>
          </button>
          <span className="text-gray-500 mb-1">Crea tu cuenta</span>
          <h2 className="text-2xl font-bold mb-6">Regístrate en ImpresionArte</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
            {message && (
              <div className="sm:col-span-6">
                <p className="text-green-500 text-xs h-5 mt-1">{message}</p>
              </div>
            )}
            {/* Nombre */}
            <div className="sm:col-span-3">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-700">Nombre</label>
              <div className="mt-2">
                <input type="text" name="nombre" id="nombre" autoComplete="nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ingresa tu nombre" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.nombre || "\u00A0"}</p>
            </div>
            {/* Rut */}
            <div className="sm:col-span-3">
              <label htmlFor="rut" className="block text-sm font-medium leading-6 text-gray-700">Rut</label>
              <div className="mt-2">
                <input type="text" name="rut" id="rut" autoComplete="rut" value={formData.rut} onChange={e => setFormData({ ...formData, rut: e.target.value })} placeholder="Ingresa tu rut" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.rut || "\u00A0"}</p>
            </div>
            {/* Apellido Paterno */}
            <div className="sm:col-span-3">
              <label htmlFor="apellido_paterno" className="block text-sm font-medium leading-6 text-gray-700">Apellido Paterno</label>
              <div className="mt-2">
                <input type="text" name="apellido_paterno" id="apellido_paterno" autoComplete="apellido_paterno" value={formData.apellido_paterno} onChange={e => setFormData({ ...formData, apellido_paterno: e.target.value })} placeholder="Ingresa tu apellido paterno" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.apellido_paterno || "\u00A0"}</p>
            </div>
            {/* Apellido Materno */}
            <div className="sm:col-span-3">
              <label htmlFor="apellido_materno" className="block text-sm font-medium leading-6 text-gray-700">Apellido Materno</label>
              <div className="mt-2">
                <input type="text" name="apellido_materno" id="apellido_materno" autoComplete="apellido_materno" value={formData.apellido_materno} onChange={e => setFormData({ ...formData, apellido_materno: e.target.value })} placeholder="Ingresa tu apellido materno" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.apellido_materno || "\u00A0"}</p>
            </div>
            {/* Fecha de Nacimiento */}
            <div className="sm:col-span-3">
              <label htmlFor="fecha_nacimiento" className="block text-sm font-medium leading-6 text-gray-700">Fecha de nacimiento</label>
              <div className="mt-2">
                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleFechaChange} className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.fecha_nacimiento || "\u00A0"}</p>
            </div>
            {/* Región */}
            <div className="sm:col-span-3">
              <label htmlFor="id_region" className="block text-sm font-medium leading-6 text-gray-700">Región</label>
              <div className="mt-2">
                <select id="id_region" name="id_region" value={formData.id_region} onChange={handleRegionChange} className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-9">
                  <option value="">Seleccione una región</option>
                  {regionesEjemplo.map(region => (
                    <option key={region.id_region} value={region.id_region}>{region.nombre}</option>
                  ))}
                </select>
              </div>
              <p className="text-red-500 text-xs mt-1">{errors.id_region || "\u00A0"}</p>
            </div>
            {/* Comuna */}
            <div className="sm:col-span-3">
              <label htmlFor="id_comuna" className="block text-sm font-medium leading-6 text-gray-700">Comuna</label>
              <div className="mt-2">
                <select id="id_comuna" name="id_comuna" value={formData.id_comuna} onChange={e => setFormData({ ...formData, id_comuna: e.target.value })} className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-9" disabled={!formData.id_region}>
                  <option value="">Seleccione una comuna</option>
                  {comunas.map(comuna => (
                    <option key={comuna.id_comuna} value={comuna.id_comuna}>{comuna.nombre}</option>
                  ))}
                </select>
              </div>
              <p className="text-red-500 text-xs mt-1">{errors.id_comuna || "\u00A0"}</p>
            </div>
            {/* Teléfono */}
            <div className="sm:col-span-3">
              <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-700">Teléfono</label>
              <div className="mt-2">
                <input type="text" name="telefono" id="telefono" autoComplete="telefono" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} placeholder="Ingresa tu teléfono" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.telefono || "\u00A0"}</p>
            </div>
            {/* Correo Electrónico */}
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">Correo Electrónico</label>
              <div className="mt-2">
                <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Ingresa tu correo " className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.email || "\u00A0"}</p>
            </div>
            {/* Confirmar Correo Electrónico */}
            <div className="sm:col-span-3">
              <label htmlFor="confirmar_email" className="block text-sm font-medium leading-6 text-gray-700">Confirmar Correo </label>
              <div className="mt-2">
                <input type="email" name="confirmar_email" id="confirmar_email" autoComplete="confirmar_email" value={formData.confirmar_email} onChange={e => setFormData({ ...formData, confirmar_email: e.target.value })} placeholder="Confirma tu correo " className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.confirmar_email || "\u00A0"}</p>
            </div>
            {/* Contraseña */}
            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">Contraseña</label>
              <div className="mt-2">
                <input type="password" name="password" id="password" autoComplete="new-password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Ingresa tu contraseña" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.password || "\u00A0"}</p>
            </div>
            {/* Confirmar Contraseña */}
            <div className="sm:col-span-3">
              <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-700">Confirmar Contraseña</label>
              <div className="mt-2">
                <input type="password" name="confirm_password" id="confirm_password" autoComplete="new-password" value={formData.confirm_password} onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} placeholder="Confirma tu contraseña" className="p-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p className="text-red-500 text-xs h-5 mt-1">{errors.confirm_password || "\u00A0"}</p>
            </div>
          </div>
          <div className="text-center">
            <button style={{ width: "50%" }} type="submit" className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Registrar</button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-400 text-center w-full max-w-md mx-auto px-4 sm:px-8">
          <p>¿Ya posees cuenta? <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>Iniciar Sesión</button></p>
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