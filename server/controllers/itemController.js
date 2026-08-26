const Item = require('../models/Item');

// @desc    Fetch all items
// @route   GET /api/items
// @access  Private
const getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Private
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search items
// @route   GET /api/items/search?q=
// @access  Private
const searchItems = async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          $or: [
            { name: { $regex: req.query.q, $options: 'i' } },
            { category: { $regex: req.query.q, $options: 'i' } },
            { itemId: { $regex: req.query.q, $options: 'i' } },
          ],
        }
      : {};

    const items = await Item.find({ ...keyword });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  try {
    const { name, category, description, price, stock } = req.body;
    let image = '';

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    // Generate unique itemId
    const count = await Item.countDocuments();
    const itemId = `#${101 + count}`;

    const item = new Item({
      itemId,
      name,
      category,
      description,
      price: Number(price),
      stock: Number(stock),
      image,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const { name, category, description, price, stock } = req.body;

    const item = await Item.findById(req.params.id);

    if (item) {
      item.name = name || item.name;
      item.category = category || item.category;
      item.description = description !== undefined ? description : item.description;
      item.price = price !== undefined ? Number(price) : item.price;
      item.stock = stock !== undefined ? Number(stock) : item.stock;

      if (req.file) {
        item.image = `/uploads/${req.file.filename}`;
      }

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  searchItems,
  createItem,
  updateItem,
  deleteItem,
};
