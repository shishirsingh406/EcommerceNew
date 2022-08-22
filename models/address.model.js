const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  contactNumber: {
    type: Number,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  landmark: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  zipCode: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  user: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});
module.exports = mongoose.model('ADDRESS', addressSchema);
