const mongoose = require('mongoose');
const MessageMethods = require('./methods');
const MessageSchema = require('./schema');

MessageSchema.loadClass(MessageMethods);

module.exports = mongoose.model('messages', MessageSchema, 'messages');
