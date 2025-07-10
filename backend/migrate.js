const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runMigration() {
  try {
    console.log('🔄 Iniciando migración de la base de datos...');
    
    // Leer el archivo SQL
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Ejecutar las consultas SQL
    console.log('📝 Ejecutando esquema de la base de datos...');
    await pool.query(schema);
    
    console.log('✅ Migración completada exitosamente!');
    console.log('📊 Tablas creadas:');
    console.log('   - categorias');
    console.log('   - productos');
    console.log('📦 Datos insertados:');
    console.log('   - 3 categorías');
    console.log('   - 11 productos de ejemplo');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Ejecutar la migración
runMigration(); 