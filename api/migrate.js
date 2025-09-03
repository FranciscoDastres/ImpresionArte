const pool = require("../backend/db");

const createTables = async () => {
  try {
    // Crear tabla de categorías
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(20) DEFAULT 'cliente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de productos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        precio_anterior DECIMAL(10,2),
        descripcion TEXT,
        descuento DECIMAL(5,2),
        imagen_principal TEXT,
        imagenes_adicionales TEXT[],
        categoria_id INTEGER REFERENCES categorias(id),
        stock INTEGER DEFAULT 0,
        activo BOOLEAN DEFAULT true,
        usuario_id INTEGER REFERENCES usuarios(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insertar categorías de ejemplo si no existen
    await pool.query(`
      INSERT INTO categorias (nombre, descripcion) 
      VALUES 
        ('armas-de-fantasia', 'Armas de fantasía y ciencia ficción'),
        ('futurama', 'Productos inspirados en Futurama'),
        ('navi', 'Productos de la película Avatar'),
        ('robots', 'Robots y figuras robóticas'),
        ('vasos3d', 'Vasos y tazas 3D personalizadas')
      ON CONFLICT (nombre) DO NOTHING
    `);

    // Insertar usuario admin de ejemplo si no existe
    const adminPassword = await require('bcrypt').hash('admin123', 10);
    await pool.query(`
      INSERT INTO usuarios (nombre, email, password, rol) 
      VALUES ('Admin Demo', 'admin@demo.com', $1, 'admin')
      ON CONFLICT (email) DO NOTHING
    `, [adminPassword]);

    // Insertar productos de ejemplo si no existen
    await pool.query(`
      INSERT INTO productos (titulo, precio, descripcion, categoria_id, stock, activo, usuario_id) 
      VALUES 
        ('Espada de Fantasía', 29.99, 'Espada decorativa de fantasía', 1, 10, true, 1),
        ('Bender Chulo', 19.99, 'Figura de Bender de Futurama', 2, 15, true, 1),
        ('Placa Navi', 24.99, 'Placa decorativa estilo Navi', 3, 8, true, 1),
        ('Robot Futurista', 34.99, 'Robot decorativo futurista', 4, 12, true, 1),
        ('Vaso 3D Personalizado', 14.99, 'Vaso 3D con diseño personalizado', 5, 20, true, 1)
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error en migración:', error);
    throw error;
  }
};

// Ejecutar migración si se llama directamente
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('Migración completada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error en migración:', error);
      process.exit(1);
    });
}

module.exports = createTables;
