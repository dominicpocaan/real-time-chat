const mongoose = require('mongoose');
const UserSchema = require('./schema');

module.exports = mongoose.model('users', UserSchema, 'users');
