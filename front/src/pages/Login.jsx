import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.email) newErrors.email = "El correo es obligatorio";
    if (!formData.password) newErrors.password = "La contraseña es obligatoria";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        // Redireccionar por rol (AuthContext tiene el user)
        if (res?.user?.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setMessage(res.error || "Credenciales inválidas o error de servidor");
      }
    } catch (err) {
      setMessage("Error inesperado de servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-white">
      {/* Panel Izquierdo: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white py-8 px-4 sm:px-8 min-h-[60vh]">
        {/* Logo y título */}
        <div className="w-full max-w-md mx-auto flex flex-col items-start pt-4 sm:pt-8">
          <button className="flex items-center mb-8 group" onClick={() => navigate("/")}>
            {/* (SVG de logo) */}
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
                aria-label="Correo electrónico"
                disabled={submitting}
              />
              {/* Icono email */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                {/* Email SVG */}
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
                autoComplete="current-password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="********"
                className="p-3 pl-10 pr-10 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Contraseña"
                disabled={submitting}
              />
              {/* Icono candado */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                {/* SVG candado */}
              </span>
              {/* Icono mostrar/ocultar */}
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                aria-label={`Mostrar contraseña`}
                disabled={submitting}
              >
                {/* SVG ojo/oculto */}
              </button>
            </div>
            <p className="text-red-500 text-xs h-5 mt-1">{errors.password || "\u00A0"}</p>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            disabled={submitting}
            aria-label="Iniciar sesión"
          >
            {submitting ? "Ingresando..." : "Iniciar sesión"}
          </button>
          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">o ingresa con</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>
          {/* Botones sociales deshabilitados con mensaje */}
          <div className="flex justify-center gap-4 mt-2">
            {["Facebook", "Google", "Apple"].map((prov, i) => (
              <button
                key={prov}
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-200 bg-white opacity-60 cursor-not-allowed"
                title={`Próximamente: login con ${prov}`}
                disabled
                onClick={() => setMessage("Próximamente se habilitará este método")}
                tabIndex={-1}
                aria-label={`Login con ${prov} deshabilitado`}
              >
                {/* Aquí tus SVGs */}
              </button>
            ))}
          </div>
        </form>
        <div className="mt-8 text-sm text-gray-500 text-center w-full max-w-md mx-auto px-4 sm:px-8">
          <p>
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/register')}
            >Regístrate aquí</button>
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
