const express = require('express');
const { createSQLiteUser, getAllSQLiteUsers } = require('../controllers/sqliteController');

const router = express.Router();

router.post('/sqlite/users', createSQLiteUser);
router.get('/sqlite/users', getAllSQLiteUsers);

module.exports = router;