const express = require('express');
const { createMongoUser, healthCheck,getAllMongoUsers } = require('../controllers/mongoController');

const router = express.Router();

router.get('/health', healthCheck);
router.post('/mongo/users', createMongoUser);
router.get('/mongo/users', getAllMongoUsers);

module.exports = router;