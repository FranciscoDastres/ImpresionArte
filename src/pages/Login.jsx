import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Simulación de validación simple
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.email) newErrors.email = "El correo es obligatorio";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setMessage("¡Inicio de sesión simulado!");
    } else {
      setMessage("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white">
      {/* Panel Izquierdo: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white py-8 px-4 sm:px-8 min-h-[60vh]">
        {/* Logo y título */}
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
          <span className="text-gray-500 mb-1">Comienza tu experiencia</span>
          <h2 className="text-2xl font-bold mb-6">Inicia sesión en ImpresionArte</h2>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
          {message && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="tucorreo@ejemplo.com"
                className="p-3 pl-10 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Icono email */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            <p className="text-red-500 text-xs h-5 mt-1">{errors.email || "\u00A0"}</p>
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="********"
                className="p-3 pl-10 pr-10 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Icono candado */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V9a6 6 0 10-12 0v1m12 0H6m12 0v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              {/* Icono mostrar/ocultar */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none">
                {showPassword ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#2563eb" strokeWidth="2"/></svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.77 21.77 0 014.22-5.94M9.53 9.53A3.5 3.5 0 0112 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .47-.09.92-.26 1.33" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 1l22 22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </button>
            </div>
            <p className="text-red-500 text-xs h-5 mt-1">{errors.password || "\u00A0"}</p>
          </div>
          {/* Botón principal */}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200">Iniciar sesión</button>
          {/* Separador */}
          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">o ingresa con</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          {/* Botones sociales */}
          <div className="flex justify-center gap-4 mt-2">
            <button type="button" className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-200 bg-white hover:bg-gray-100" title="Iniciar sesión con Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1877F3"/><path d="M15.36 8.26h-1.41c-.17 0-.36.23-.36.5v1.01h1.77l-.23 1.77h-1.54v4.46h-1.85v-4.46h-1.23v-1.77h1.23v-1.3c0-1.01.7-1.95 2.01-1.95h1.41v1.74z" fill="#fff"/></svg>
            </button>
            <button type="button" className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-200 bg-white hover:bg-gray-100" title="Iniciar sesión con Google">
              <svg width="24" height="24" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M21.35 11.1h-9.18v2.8h5.24c-.23 1.23-1.4 3.6-5.24 3.6-3.15 0-5.72-2.6-5.72-5.8s2.57-5.8 5.72-5.8c1.8 0 3.01.77 3.7 1.43l2.53-2.46C16.13 3.9 14.25 3 12 3 6.48 3 2 7.48 2 13s4.48 10 10 10c5.52 0 10-4.48 10-10 0-.68-.07-1.34-.19-1.9z" fill="#4285F4"/></g></svg>
            </button>
            <button type="button" className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-200 bg-white hover:bg-gray-100" title="Iniciar sesión con Apple">
              <svg width="24" height="24" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="10" fill="#000"/><path d="M16.5 12c0-2.5-2-4.5-4.5-4.5S7.5 9.5 7.5 12s2 4.5 4.5 4.5 4.5-2 4.5-4.5z" fill="#fff"/></g></svg>
            </button>
          </div>
        </form>
        <div className="mt-8 text-sm text-gray-500 text-center w-full max-w-md mx-auto px-4 sm:px-8">
          <p>
            ¿No tienes cuenta?{' '}
            <button type="button" className="text-blue-600 hover:underline" onClick={() => navigate('/register')}>Regístrate aquí</button>
          </p>
        </div>
      </div>
      {/* Panel Derecho: Imagen de fondo */}
      <div className="hidden md:block w-full lg:w-1/2 h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Fondo login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
} 