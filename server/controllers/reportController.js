const Bill = require('../models/Bill');
const Item = require('../models/Item');

// @desc    Get sales report
// @route   GET /api/reports/sales
// @access  Private
const getSalesReport = async (req, res) => {
  try {
    const bills = await Bill.find({});
    
    const totalSales = bills.reduce((acc, bill) => acc + bill.grandTotal, 0);
    const numberOfInvoices = bills.length;
    
    let totalItemsSold = 0;
    bills.forEach(bill => {
      bill.items.forEach(item => {
        totalItemsSold += item.quantity;
      });
    });

    res.json({
      totalSales,
      numberOfInvoices,
      totalItemsSold,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get top selling items
// @route   GET /api/reports/top-items
// @access  Private
const getTopItems = async (req, res) => {
  try {
    const bills = await Bill.find({});
    
    const itemSales = {};
    bills.forEach(bill => {
      bill.items.forEach(item => {
        if (itemSales[item.itemId]) {
          itemSales[item.itemId].quantity += item.quantity;
          itemSales[item.itemId].revenue += item.total;
        } else {
          itemSales[item.itemId] = {
            name: item.name,
            quantity: item.quantity,
            revenue: item.total,
          };
        }
      });
    });

    const topItems = Object.values(itemSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    res.json(topItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock items report
// @route   GET /api/reports/low-stock
// @access  Private
const getLowStockReport = async (req, res) => {
  try {
    const lowStockItems = await Item.find({ status: { $in: ['Low Stock', 'Out of Stock'] } }).sort({ stock: 1 });
    res.json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSalesReport,
  getTopItems,
  getLowStockReport,
};
