const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  conversationId: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, required: true },
  sentBy: { type: String, required: true },
});

module.exports = MessageSchema;
