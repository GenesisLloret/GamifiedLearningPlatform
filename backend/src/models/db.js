const Database = require('better-sqlite3');
const path = require('path');

const file = path.join(__dirname, 'db.sqlite');
const db = new Database(file);

// Crea la tabla de usuarios si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

module.exports = db;
