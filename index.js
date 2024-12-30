const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// SQLite database connection
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the `users` table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
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
    )
  `);
});

// Routes
app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});

app.post('/users', (req, res) => {
  const { age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year } = req.body;
  const id = uuidv4();

  db.run(
    `INSERT INTO users (id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year],
    function (err) {
      if (err) {
        console.error('Database error:', err.message);
        return res.status(500).json({ error: 'Database error occurred' });
      }
      res.status(201).json({ message: 'User created successfully!', id });
    }
  );
});

// For local development
if (process.env.NODE_ENV !== 'serverless') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running locally at http://localhost:${port}`);
  });
}

// Export for serverless environments
module.exports = serverless(app);