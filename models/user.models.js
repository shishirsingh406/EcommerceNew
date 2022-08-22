const mongoose = require('mongoose');
const validator = require('validator');

/**
 * create schema for user
 *
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email-id format!',
      isAsync: false,
    },
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
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
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: validator.isStrongPassword,
      message: 'not a strong password',
      isAsync: false,
    },
  },
  // add address field to make database bidirectional
  address: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'address',
  },
  // add all order , ordered by p particular user
  orderList: {
    type: [mongoose.SchemaType.ObjectId],
    ref: 'orders',
  },
  createProduct: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'products',
  },
  updateProduct: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'products',
  },
});

module.exports = mongoose.model('USER', userSchema);
