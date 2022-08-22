const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  addressId: {
    type: String,
    require: true,
  },
  productId: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});
module.exports = mongoose.model('ORDER', orderSchema);
