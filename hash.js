const bcrypt = require('bcrypt');

const password = 'tu_contraseña_segura'; // Cambia esto por la contraseña que quieras para el admin

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash generado:', hash);
});