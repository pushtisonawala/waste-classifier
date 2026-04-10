const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const statsController = require('../controllers/statsController');

router.get('/summary', auth, statsController.getStats);
router.get('/history', auth, statsController.getHistory);
router.get('/daily', auth, statsController.getDailyStats);

module.exports = router;
