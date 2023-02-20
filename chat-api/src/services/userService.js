const UserModel = require('../models/user');

const get = async (id) => {
  const user = await UserModel.getById(id);

  return user;
};

const getAll = async (data) => {
  const { except, email } = data;

  const users = await UserModel.getAll({ except, email });

  return users;
};

module.exports = { get, getAll };
