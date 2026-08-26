const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  searchItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

router.get('/search', protect, searchItems);
router
  .route('/')
  .get(protect, getItems)
  .post(protect, upload.single('image'), createItem);
router
  .route('/:id')
  .get(protect, getItemById)
  .put(protect, upload.single('image'), updateItem)
  .delete(protect, deleteItem);

module.exports = router;
