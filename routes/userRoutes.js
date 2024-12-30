const express = require('express');
const { createUser, healthCheck } = require('../controllers/userController');

const router = express.Router();

router.get('/health', healthCheck);
router.post('/users', createUser);

module.exports = router;