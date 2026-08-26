const express = require('express');
const router = express.Router();
const {
  getStats,
  getSalesData,
  getRecentTransactions,
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);
router.get('/sales', protect, getSalesData);
router.get('/recent-transactions', protect, getRecentTransactions);

module.exports = router;
