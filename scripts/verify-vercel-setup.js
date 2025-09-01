#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para Vercel...\n');

const checks = [
  {
    name: 'vercel.json',
    path: 'vercel.json',
    required: true
  },
  {
    name: 'api/index.js',
    path: 'api/index.js',
    required: true
  },
  {
    name: 'package.json (dependencias del backend)',
    path: 'package.json',
    required: true,
    check: (content) => {
      const pkg = JSON.parse(content);
      const requiredDeps = ['express', 'cors', 'pg', 'bcrypt', 'jsonwebtoken', 'dotenv'];
      const missing = requiredDeps.filter(dep => !pkg.dependencies[dep]);
      return missing.length === 0 ? true : `Faltan dependencias: ${missing.join(', ')}`;
    }
  },
  {
    name: 'backend/db.js (configuración de DB)',
    path: 'backend/db.js',
    required: true,
    check: (content) => {
      return content.includes('DATABASE_URL') ? true : 'No está configurado para usar DATABASE_URL';
    }
  },
  {
    name: 'api/migrate.js',
    path: 'api/migrate.js',
    required: true
  },
  {
    name: '.gitignore',
    path: '.gitignore',
    required: true,
    check: (content) => {
      return content.includes('.vercel') ? true : 'No incluye .vercel en .gitignore';
    }
  }
];

let allPassed = true;

checks.forEach(check => {
  try {
    if (fs.existsSync(check.path)) {
      const content = fs.readFileSync(check.path, 'utf8');
      
      if (check.check) {
        const result = check.check(content);
        if (result === true) {
          console.log(`✅ ${check.name}`);
        } else {
          console.log(`❌ ${check.name}: ${result}`);
          allPassed = false;
        }
      } else {
        console.log(`✅ ${check.name}`);
      }
    } else {
      console.log(`❌ ${check.name}: Archivo no encontrado`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${check.name}: Error al verificar - ${error.message}`);
    allPassed = false;
  }
});

console.log('\n📋 Variables de entorno requeridas:');
console.log('   - DATABASE_URL');
console.log('   - JWT_SECRET');
console.log('   - NODE_ENV=production');
console.log('   - CORS_ORIGIN (opcional)');

console.log('\n🚀 Próximos pasos:');
console.log('   1. Configurar variables de entorno en Vercel');
console.log('   2. Conectar repositorio a Vercel');
console.log('   3. Hacer deploy');
console.log('   4. Ejecutar migraciones: npm run migrate');

if (allPassed) {
  console.log('\n🎉 ¡Todo está configurado correctamente para Vercel!');
} else {
  console.log('\n⚠️  Hay algunos problemas que necesitan ser corregidos antes del deploy.');
}

console.log('\n📖 Para más información, consulta: VERCEL_DEPLOYMENT_GUIDE.md');
