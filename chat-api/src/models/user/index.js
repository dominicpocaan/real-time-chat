const mongoose = require('mongoose');
const UserMethods = require('./methods');
const UserSchema = require('./schema');

UserSchema.loadClass(UserMethods);

module.exports = mongoose.model('users', UserSchema, 'users');
