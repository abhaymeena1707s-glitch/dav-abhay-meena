const Bill = require('../models/Bill');
const Item = require('../models/Item');

// @desc    Create new bill
// @route   POST /api/bills
// @access  Private
const createBill = async (req, res) => {
  try {
    const { items, subtotal, discount, grandTotal } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No items in bill' });
    }

    // Check stock for all items first
    for (let i = 0; i < items.length; i++) {
      const dbItem = await Item.findOne({ itemId: items[i].itemId });
      if (!dbItem) {
        return res.status(404).json({ message: `Item ${items[i].name} not found in inventory` });
      }
      if (dbItem.stock < items[i].quantity) {
        return res.status(400).json({ message: `Not enough stock for ${items[i].name}. Available: ${dbItem.stock}` });
      }
    }

    // Deduct stock
    for (let i = 0; i < items.length; i++) {
      const dbItem = await Item.findOne({ itemId: items[i].itemId });
      dbItem.stock -= items[i].quantity;
      await dbItem.save(); // status is auto-updated via pre-save hook
    }

    // Generate Invoice Number (e.g., INV-1001)
    const count = await Bill.countDocuments();
    const invoiceNumber = `INV-${1001 + count}`;

    const bill = new Bill({
      invoiceNumber,
      items,
      subtotal,
      discount,
      grandTotal,
    });

    const createdBill = await bill.save();

    res.status(201).json(createdBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bills
// @route   GET /api/bills
// @access  Private
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bill by ID
// @route   GET /api/bills/:id
// @access  Private
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (bill) {
      res.json(bill);
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
};
