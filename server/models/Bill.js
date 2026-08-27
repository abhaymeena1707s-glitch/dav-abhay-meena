const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        itemId: {
          type: String, // String referencing Item's itemId (not _id)
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt will be used as the invoice date
  }
);

module.exports = mongoose.model('Bill', billSchema);
