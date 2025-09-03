const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    // Crear conexión directamente aquí
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    const { email, password, action } = req.body;

    if (action === 'login') {
      // Login
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        // Cerrar la conexión
        await pool.end();
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = result.rows[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        // Cerrar la conexión
        await pool.end();
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '24h' }
      );

      // Cerrar la conexión
      await pool.end();

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol
        }
      });
    } else if (action === 'register') {
      // Register (simplificado)
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, email, nombre, rol',
        ['Usuario Demo', email, hashedPassword, 'cliente']
      );

      // Cerrar la conexión
      await pool.end();

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: result.rows[0]
      });
    } else {
      // Cerrar la conexión
      await pool.end();
      res.status(400).json({ error: 'Acción no válida' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en autenticación" });
  }
};
