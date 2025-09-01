const pool = require('../backend/db');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  try {
    console.log('Iniciando migraciones...');
    
    // Leer el archivo schema.sql
    const schemaPath = path.join(__dirname, '../backend/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Ejecutar las migraciones
    await pool.query(schema);
    
    console.log('Migraciones completadas exitosamente');
    
    // Verificar que las tablas se crearon
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Tablas creadas:', tables.rows.map(row => row.table_name));
    
  } catch (error) {
    console.error('Error durante las migraciones:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migraciones completadas');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error en migraciones:', error);
      process.exit(1);
    });
}

module.exports = runMigrations;
