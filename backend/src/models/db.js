const Database = require('better-sqlite3');
const path = require('path');
const file = path.join(__dirname, 'db.sqlite');
const db = new Database(file);
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'alumno',
  status TEXT DEFAULT 'active'
)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS tutoring (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  professor_id INTEGER,
  student_id INTEGER
)`).run();
module.exports = db;
