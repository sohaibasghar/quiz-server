const { v4: uuidv4 } = require('uuid');
const connectSQLite = require('../config/dbSQLite');

// Initialize SQLite connection
const db = connectSQLite();

// Create a SQLite user
exports.createSQLiteUser = (req, res) => {
  const { age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year } = req.body;

  if (!age || !gender || !education || !ethnicity || !nationality || !issue || !religious_affiliation || !lived_year) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const id = uuidv4();

  db.run(
    `INSERT INTO users (id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year],
    function (err) {
      if (err) {
        console.error('Error inserting SQLite user:', err.message);
        return res.status(500).json({ error: 'Failed to create SQLite user.' });
      }
      res.status(201).json({ message: 'SQLite user created successfully.', id });
    }
  );
};

// Get all SQLite users
exports.getAllSQLiteUsers = (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching SQLite users:', err.message);
      return res.status(500).json({ error: 'Failed to fetch SQLite users.' });
    }
    res.status(200).json(rows);
  });
};