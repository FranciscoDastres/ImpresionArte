import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const regionesEjemplo = [
  { id_region: 1, nombre: "Región Metropolitana" },
  { id_region: 2, nombre: "Valparaíso" },
  { id_region: 3, nombre: "Biobío" },
];

const comunasEjemplo = {
  1: [
    { id_comuna: 1, nombre: "Santiago" },
    { id_comuna: 2, nombre: "Providencia" },
  ],
  2: [
    { id_comuna: 3, nombre: "Valparaíso" },
    { id_comuna: 4, nombre: "Viña del Mar" },
  ],
  3: [
    { id_comuna: 5, nombre: "Concepción" },
    { id_comuna: 6, nombre: "Talcahuano" },
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
  const handleSubmit = (e) => {
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
    if (Object.keys(newErrors).length === 0) {
      setMessage("¡Registro simulado exitoso!");
      // Aquí podrías redirigir o limpiar el formulario
    } else {
      setMessage("");
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
    <div className="flex h-screen">
      {/* Panel Izquierdo: Ilustración */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          {/* SVG ilustración */}
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 524.67 531.40"><circle cx="124.14" cy="80.64" r="21.99" fill="#a0616a"/><rect x="133.62" y="251.97" width="46.50" height="5.96" rx=".31" fill="#000"/><circle cx="334.34" cy="253.16" r="4.77" fill="#3f3d56"/><circle cx="347.45" cy="253.16" r="4.77" fill="#3f3d56"/><circle cx="360.57" cy="253.16" r="4.77" fill="#3f3d56"/><rect x="4" y="8" width="24" height="16" rx="3" fill="#2563eb"/><rect x="8" y="12" width="16" height="8" rx="2" fill="#fff"/><rect x="12" y="16" width="8" height="4" rx="1" fill="#2563eb"/></svg>
        </div>
      </div>
      {/* Panel Derecho: Formulario */}
      <div className="min-h-screen w-full bg-[#1e2124] lg:w-1/2 lg:flex items-center justify-center">
        <div className="w-full p-6">
          <form onSubmit={handleSubmit} className="space-y-4 p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
              {/* Mensaje de error o éxito */}
              {message && (
                <div className="sm:col-span-6">
                  <p className="text-green-500 text-xs h-5 mt-1">{message}</p>
                </div>
              )}
              {/* Nombre */}
              <div className="sm:col-span-3">
                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-white">Nombre</label>
                <div className="mt-2">
                  <input type="text" name="nombre" id="nombre" autoComplete="nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ingresa tu nombre" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.nombre || "\u00A0"}</p>
              </div>
              {/* Rut */}
              <div className="sm:col-span-3">
                <label htmlFor="rut" className="block text-sm font-medium leading-6 text-white">Rut</label>
                <div className="mt-2">
                  <input type="text" name="rut" id="rut" autoComplete="rut" value={formData.rut} onChange={e => setFormData({ ...formData, rut: e.target.value })} placeholder="Ingresa tu rut" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.rut || "\u00A0"}</p>
              </div>
              {/* Apellido Paterno */}
              <div className="sm:col-span-3">
                <label htmlFor="apellido_paterno" className="block text-sm font-medium leading-6 text-white">Apellido Paterno</label>
                <div className="mt-2">
                  <input type="text" name="apellido_paterno" id="apellido_paterno" autoComplete="apellido_paterno" value={formData.apellido_paterno} onChange={e => setFormData({ ...formData, apellido_paterno: e.target.value })} placeholder="Ingresa tu apellido paterno" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.apellido_paterno || "\u00A0"}</p>
              </div>
              {/* Apellido Materno */}
              <div className="sm:col-span-3">
                <label htmlFor="apellido_materno" className="block text-sm font-medium leading-6 text-white">Apellido Materno</label>
                <div className="mt-2">
                  <input type="text" name="apellido_materno" id="apellido_materno" autoComplete="apellido_materno" value={formData.apellido_materno} onChange={e => setFormData({ ...formData, apellido_materno: e.target.value })} placeholder="Ingresa tu apellido materno" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.apellido_materno || "\u00A0"}</p>
              </div>
              {/* Fecha de Nacimiento */}
              <div className="sm:col-span-3">
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium leading-6 text-white">Fecha de nacimiento</label>
                <div className="mt-2">
                  <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleFechaChange} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.fecha_nacimiento || "\u00A0"}</p>
              </div>
              {/* Región */}
              <div className="sm:col-span-3">
                <label htmlFor="id_region" className="block text-sm font-medium leading-6 text-white">Región</label>
                <div className="mt-2">
                  <select id="id_region" name="id_region" value={formData.id_region} onChange={handleRegionChange} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-9">
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
                <label htmlFor="id_comuna" className="block text-sm font-medium leading-6 text-white">Comuna</label>
                <div className="mt-2">
                  <select id="id_comuna" name="id_comuna" value={formData.id_comuna} onChange={e => setFormData({ ...formData, id_comuna: e.target.value })} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-9" disabled={!formData.id_region}>
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
                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-white">Teléfono</label>
                <div className="mt-2">
                  <input type="text" name="telefono" id="telefono" autoComplete="telefono" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} placeholder="Ingresa tu teléfono" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.telefono || "\u00A0"}</p>
              </div>
              {/* Correo Electrónico */}
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Correo Electrónico</label>
                <div className="mt-2">
                  <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Ingresa tu correo electrónico" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.email || "\u00A0"}</p>
              </div>
              {/* Confirmar Correo Electrónico */}
              <div className="sm:col-span-3">
                <label htmlFor="confirmar_email" className="block text-sm font-medium leading-6 text-white">Confirmar Correo Electrónico</label>
                <div className="mt-2">
                  <input type="email" name="confirmar_email" id="confirmar_email" autoComplete="confirmar_email" value={formData.confirmar_email} onChange={e => setFormData({ ...formData, confirmar_email: e.target.value })} placeholder="Confirma tu correo electrónico" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.confirmar_email || "\u00A0"}</p>
              </div>
              {/* Contraseña */}
              <div className="sm:col-span-3">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Contraseña</label>
                <div className="mt-2">
                  <input type="password" name="password" id="password" autoComplete="new-password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Ingresa tu contraseña" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.password || "\u00A0"}</p>
              </div>
              {/* Confirmar Contraseña */}
              <div className="sm:col-span-3">
                <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-white">Confirmar Contraseña</label>
                <div className="mt-2">
                  <input type="password" name="confirm_password" id="confirm_password" autoComplete="new-password" value={formData.confirm_password} onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} placeholder="Confirma tu contraseña" className="p-2 block w-full rounded-md border-0 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
                <p className="text-red-500 text-xs h-5 mt-1">{errors.confirm_password || "\u00A0"}</p>
              </div>
            </div>
            <div className="text-center">
              <button style={{ width: "50%" }} type="submit" className="bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Registrar</button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-400 text-center">
            <p>¿Ya posees cuenta? <button type="button" className="text-white hover:underline" onClick={() => navigate('/login')}>Iniciar Sesión</button></p>
          </div>
        </div>
      </div>
    </div>
  );
} 