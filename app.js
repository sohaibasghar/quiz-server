const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./config/dbMongo');
const mongoRoutes = require('./routes/mongoRoutes');
const sqliteRoutes = require('./routes/sqliteRoutes');

const app = express();

// Connect to MongoDB
connectMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', mongoRoutes);
app.use('/api', sqliteRoutes);

module.exports = app;