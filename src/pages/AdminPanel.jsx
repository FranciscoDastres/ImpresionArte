// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // producto en edición
  const [form, setForm] = useState({ titulo: "", precio: "", descripcion: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/productos");
        setProducts(res.data);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await axios.delete(`/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch {
      alert("Error al eliminar producto");
    }
  };

  const handleEdit = (prod) => {
    setEditing(prod.id);
    setForm({ titulo: prod.titulo, precio: prod.precio, descripcion: prod.descripcion });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Editar producto
        const res = await axios.put(`/api/productos/${editing}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.map(p => p.id === editing ? res.data : p));
        setEditing(null);
      } else {
        // Crear producto
        const res = await axios.post("/api/productos", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts([...products, res.data]);
      }
      setForm({ titulo: "", precio: "", descripcion: "" });
    } catch {
      alert("Error al guardar producto");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <form onSubmit={handleFormSubmit} className="mb-6 flex flex-col gap-2 bg-gray-50 p-4 rounded shadow">
        <h2 className="font-semibold mb-2">{editing ? "Editar producto" : "Crear producto"}</h2>
        <input name="titulo" value={form.titulo} onChange={handleFormChange} placeholder="Título" className="border p-2 rounded" required />
        <input name="precio" value={form.precio} onChange={handleFormChange} placeholder="Precio" type="number" min="0" className="border p-2 rounded" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleFormChange} placeholder="Descripción" className="border p-2 rounded" />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editing ? "Guardar cambios" : "Crear producto"}</button>
          {editing && <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setEditing(null); setForm({ titulo: "", precio: "", descripcion: "" }); }}>Cancelar</button>}
        </div>
      </form>
      {loading ? (
        <div>Cargando productos...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Título</th>
              <th className="border px-2 py-1">Precio</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td className="border px-2 py-1">{prod.id}</td>
                <td className="border px-2 py-1">{prod.titulo}</td>
                <td className="border px-2 py-1">{prod.precio}</td>
                <td className="border px-2 py-1">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(prod)}>Editar</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}