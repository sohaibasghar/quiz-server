const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const connectSQLite = () => {
  // Resolve the path to the SQLite database
  const dbPath = path.join(process.cwd(), 'data', 'database.db');

  // Ensure the directory exists
  const dbDirectory = path.dirname(dbPath);
  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true });
  }

  // Initialize the SQLite database
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to SQLite:', err.message);
      throw err;
    }
    console.log('Connected to SQLite database.');
  });

  // Create a table if it doesn't exist
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