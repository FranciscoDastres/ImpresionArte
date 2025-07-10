-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(10),
    color_fondo VARCHAR(20),
    color_icono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    precio_anterior DECIMAL(10,2),
    descripcion TEXT,
    descuento VARCHAR(10),
    imagen_principal VARCHAR(500) NOT NULL,
    imagenes_adicionales TEXT[], -- Array de URLs de imágenes adicionales
    categoria_id INTEGER REFERENCES categorias(id),
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías iniciales
INSERT INTO categorias (nombre, descripcion, icono, color_fondo, color_icono) VALUES
('vasos3d', 'Vasos personalizados en 3D', '🥤', 'bg-[#e0f2fe]', 'text-blue-500'),
('navi', 'Placas decorativas Navi', '🏠', 'bg-[#f1f5f9]', 'text-sky-600'),
('figuras', 'Figuras coleccionables 3D', '🎭', 'bg-[#cbd5e1]', 'text-gray-700')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar productos de ejemplo (vasos3d)
INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, categoria_id) VALUES
('Vaso 3D Verde', 25.00, 30.00, 'Vaso 3D personalizado en color verde, ideal para bebidas frías y calientes.', '17%', '/images/products/vasos3d/green-glass.jpg', (SELECT id FROM categorias WHERE nombre = 'vasos3d')),
('Vaso 3D Amarillo', 22.00, 28.00, 'Vaso 3D personalizado en color amarillo, perfecto para bebidas refrescantes.', '21%', '/images/products/vasos3d/yellow-glass1.jpg', (SELECT id FROM categorias WHERE nombre = 'vasos3d')),
('Vaso 3D Rojo', 24.00, 29.00, 'Vaso 3D personalizado en color rojo, ideal para bebidas energéticas.', '17%', '/images/products/vasos3d/colour-glass2.jpg', (SELECT id FROM categorias WHERE nombre = 'vasos3d')),
('Vaso 3D Amarillo-Rojo', 26.00, 32.00, 'Vaso 3D personalizado con gradiente amarillo-rojo, diseño único.', '19%', '/images/products/vasos3d/yellow-red-glass.jpg', (SELECT id FROM categorias WHERE nombre = 'vasos3d'))
ON CONFLICT DO NOTHING;

-- Insertar productos de ejemplo (navi)
INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, categoria_id) VALUES
('Placa Navi Honda', 45.00, 55.00, 'Placa decorativa Navi modelo Honda, perfecta para tu hogar.', '18%', '/images/products/navi/honda.jpg', (SELECT id FROM categorias WHERE nombre = 'navi')),
('Placa Navi Decorativa', 38.00, 48.00, 'Placa Navi decorativa con diseño moderno y elegante.', '21%', '/images/products/navi/placa-navi2.jpg', (SELECT id FROM categorias WHERE nombre = 'navi')),
('Placa Navi Estilo Clásico', 42.00, 52.00, 'Placa Navi con estilo clásico y acabados tradicionales.', '19%', '/images/products/navi/placa-navi3.jpg', (SELECT id FROM categorias WHERE nombre = 'navi')),
('Placa Navi Moderna', 40.00, 50.00, 'Placa Navi con diseño moderno y líneas contemporáneas.', '20%', '/images/products/navi/placa-navi4.jpg', (SELECT id FROM categorias WHERE nombre = 'navi'))
ON CONFLICT DO NOTHING;

-- Insertar productos de ejemplo (figuras)
INSERT INTO productos (titulo, precio, precio_anterior, descripcion, descuento, imagen_principal, categoria_id) VALUES
('Bender Chulo', 35.00, 45.00, 'Figura coleccionable de Bender con estilo único y detallado.', '22%', '/images/products/futurama/bender-chulo.jpg', (SELECT id FROM categorias WHERE nombre = 'figuras')),
('Robot Taladro 1', 28.00, 38.00, 'Robot taladro coleccionable con diseño mecánico detallado.', '26%', '/images/products/robots/Unknow_1.jpg', (SELECT id FROM categorias WHERE nombre = 'figuras')),
('Robot Taladro 2', 32.00, 42.00, 'Robot taladro coleccionable versión mejorada con más detalles.', '24%', '/images/products/robots/Unknow_2.jpg', (SELECT id FROM categorias WHERE nombre = 'figuras'))
ON CONFLICT DO NOTHING; 