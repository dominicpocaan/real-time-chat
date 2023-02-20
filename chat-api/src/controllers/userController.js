const userService = require('../services/userService');

const get = async (req, res) => {
  const { id } = req.query;

  const user = await userService.get(id);

  res.success(user);
};

const getAll = async (req, res) => {
  const { except, email } = req.query;

  const users = await userService.getAll({ except, email });

  res.success(users);
};

module.exports = { get, getAll };
