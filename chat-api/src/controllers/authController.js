const UserModel = require('../models/user');
const authService = require('../services/authService');
const BadRequest = require('../utils/exceptions/BadRequest');
const Unauthorized = require('../utils/exceptions/Unauthorized');

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
    const user = await UserModel.getById(req.session.user.id);

    if (user === null)
      throw new BadRequest({
        description: 'User does not exist.',
        errorCode: 'ERRAUTH004',
      });

    res.success(user);
  } else {
    throw new Unauthorized({
      description: 'Unauthorized access.',
      errorCode: 'ERRAUTH003',
    });
  }
};

module.exports = { register, login, status };
