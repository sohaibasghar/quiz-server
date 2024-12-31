const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const connectSQLite = () => {
  const db = new sqlite3.Database(path.join(__dirname, '../database.db'), (err) => {
    if (err) {
      console.error('Error connecting to SQLite:', err.message);
      throw err;
    }
    console.log('Connected to SQLite database.');
  });

  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      age INTEGER,
      gender TEXT,
      education TEXT,
      ethnicity TEXT,
      nationality TEXT,
      issue TEXT,
      religious_affiliation TEXT,
      lived_year INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);
  });

  return db;
};

module.exports = connectSQLite;