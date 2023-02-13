const authService = require('../services/authService');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.register({ email, password });

  req.session.user = { id: user._id };

  res.created();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login({ email, password });

  req.session.user = { id: user._id };

  res.success();
};

module.exports = { register, login };
