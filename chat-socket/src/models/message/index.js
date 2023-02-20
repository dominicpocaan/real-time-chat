const mongoose = require('mongoose');
const MessageSchema = require('./schema');

module.exports = mongoose.model('messages', MessageSchema, 'messages');
