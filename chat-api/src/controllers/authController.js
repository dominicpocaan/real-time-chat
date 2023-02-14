const authService = require('../services/authService');
const Unauthorized = require('../utils/exceptions/unauthorized');

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

const status = async (req, res) => {
  if (req.session.user) {
    res.success();
  } else {
    throw new Unauthorized({
      description: 'Unauthorized access.',
      errorCode: 'ERRAUTH003',
    });
  }
};

module.exports = { register, login, status };
