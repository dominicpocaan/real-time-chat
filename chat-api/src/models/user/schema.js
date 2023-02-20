const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    immutable: true,
    default: () => new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  },
});

module.exports = UserSchema;
