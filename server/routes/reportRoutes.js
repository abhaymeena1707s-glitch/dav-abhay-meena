const express = require('express');
const router = express.Router();
const {
  getSalesReport,
  getTopItems,
  getLowStockReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/sales', protect, getSalesReport);
router.get('/top-items', protect, getTopItems);
router.get('/low-stock', protect, getLowStockReport);

module.exports = router;
