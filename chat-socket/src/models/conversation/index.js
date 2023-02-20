const mongoose = require('mongoose');
const ConversationMethods = require('./methods');
const ConversationSchema = require('./schema');

ConversationSchema.loadClass(ConversationMethods);

module.exports = mongoose.model(
  'conversations',
  ConversationSchema,
  'conversations'
);
