const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to get a database connection
const getDbConnection = () => {
  return new sqlite3.Database('./database.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
  });
};

// Initialize database and create users table if it doesn't exist
const initDb = () => {
  const db = getDbConnection();
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
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table initialized.');
      }
    });
  });
  db.close();
};

// Initialize the database
initDb();

// Health check route
app.get('/health', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to insert a new user
app.post('/users', (req, res) => {
  const { age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year } = req.body;

  if (!age || !gender || !education || !ethnicity || !nationality || !issue || !religious_affiliation || !lived_year) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const id = uuidv4();
  const db = getDbConnection();

  db.run(
    `INSERT INTO users (id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year],
    function(err) {
      db.close();
      if (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({ error: 'Failed to create user.' });
      }
      res.status(201).json({ message: 'User created successfully.', id });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});