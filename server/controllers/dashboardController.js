const Item = require('../models/Item');
const Bill = require('../models/Bill');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    
    const items = await Item.find({});
    const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
    const lowStockItems = await Item.countDocuments({ status: { $in: ['Low Stock', 'Out of Stock'] } });

    // Today's Sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysBills = await Bill.find({
      createdAt: {
        $gte: today,
        $lte: endOfDay,
      },
    });

    const todaysSales = todaysBills.reduce((acc, bill) => acc + bill.grandTotal, 0);

    res.json({
      totalItems,
      totalStock,
      lowStockItems,
      todaysSales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get sales data for chart
// @route   GET /api/dashboard/sales
// @access  Private
const getSalesData = async (req, res) => {
  try {
    // For simplicity, returning last 7 days sales data
    const salesData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const bills = await Bill.find({
        createdAt: {
          $gte: date,
          $lte: endOfDay,
        },
      });

      const total = bills.reduce((acc, bill) => acc + bill.grandTotal, 0);
      
      const dateString = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
      salesData.push({
        date: dateString,
        sales: total,
      });
    }

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent transactions
// @route   GET /api/dashboard/recent-transactions
// @access  Private
const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Bill.find({}).sort({ createdAt: -1 }).limit(5);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  getSalesData,
  getRecentTransactions,
};
