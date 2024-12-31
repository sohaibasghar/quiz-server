const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const connectMongoDB = require('../../config/dbMongo');
const mongoRoutes = require('../../routes/mongoRoutes');
const sqliteRoutes = require('../../routes/sqliteRoutes');
const connectSQLite = require('../../config/dbSQLite');

// Initialize Express App
const app = express();

// MongoDB Connection
connectMongoDB();

// SQLite Connection
connectSQLite();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', mongoRoutes);
app.use('/api', sqliteRoutes);

module.exports.handler = serverless(app);