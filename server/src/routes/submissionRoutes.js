const express = require('express');
const router = express.Router();
const { submitAnswer } = require('../controllers/submissionController');
const auth = require('../middlewares/authMiddleware');

// Отправка решения доступна только авторизованным
router.post('/', auth, submitAnswer);

module.exports = router;
