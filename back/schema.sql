-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('admin', 'cliente')),
    telefono VARCHAR(20),
    direccion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(10),
    color_fondo VARCHAR(20),
    color_icono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    precio_anterior DECIMAL(10,2),
    descripcion TEXT,
    descuento VARCHAR(10),
    imagen_principal VARCHAR(500) NOT NULL,
    imagenes_adicionales TEXT[],
    categoria_id INTEGER REFERENCES categorias(id),
    stock INTEGER DEFAULT 5,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'en_proceso', 'enviado', 'entregado', 'cancelado')),
    direccion_envio TEXT,
    telefono_contacto VARCHAR(20),
    notas TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de items del pedido
CREATE TABLE IF NOT EXISTS pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

-- Usuarios de ejemplo
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Admin Principal', 'admin@impresionarte.com', '$2b$10$rQZ8K9mN2pL5vX7wY3hJ6t', 'admin'),
('Cliente Ejemplo', 'cliente@ejemplo.com', '$2b$10$rQZ8K9mN2pL5vX7wY3hJ6t', 'cliente')
ON CONFLICT (email) DO NOTHING;

-- Categorías iniciales
INSERT INTO categorias (nombre, descripcion, icono, color_fondo, color_icono) VALUES
('vasos3d', 'Vasos personalizados en 3D', '🥤', 'bg-[#e0f2fe]', 'text-blue-500'),
('navi', 'Placas decorativas Navi', '🏠', 'bg-[#f1f5f9]', 'text-sky-600'),
('figuras', 'Figuras coleccionables 3D', '🎭', 'bg-[#cbd5e1]', 'text-gray-700')
ON CONFLICT (nombre) DO NOTHING;

-- Productos de ejemplo CON PRECIO CLP y stock 5+
INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, categoria_id, stock) VALUES
('Vaso 3D Verde', 3990, 4990, 'Vaso 3D personalizado en color verde', '20%', '/images/products/vasos3d/green-glass.jpg', (SELECT id FROM categorias WHERE nombre = 'vasos3d'), 50),
('Placa Navi Honda', 15990, 18990, 'Placa decorativa Navi modelo Honda', '16%', '/images/products/navi/honda.jpg', (SELECT id FROM categorias WHERE nombre = 'navi'), 30),
('Bender Chulo', 12000, 14990, 'Figura coleccionable de Bender', '20%', '/images/products/futurama/bender-chulo.jpg', (SELECT id FROM categorias WHERE nombre = 'figuras'), 25)
ON CONFLICT DO NOTHING;

-- Para asegurarte de que TODOS los productos tengan stock de al menos 5
UPDATE productos
SET stock = 5
WHERE stock IS NULL OR stock < 5;
