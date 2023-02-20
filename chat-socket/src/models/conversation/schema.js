const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  users: { type: [String], required: true },
  usersDetails: {
    type: [
      {
        id: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    required: true,
  },
  recentMessage: {
    value: { type: String },
    sentAt: { type: String },
    sentBy: { type: String },
  },
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

module.exports = ConversationSchema;
