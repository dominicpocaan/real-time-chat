const bcryptjs = require('bcryptjs');

const UserModel = require('../models/user');
const BadRequest = require('../utils/exceptions/BadRequest');

const register = async (data) => {
  const { email, password } = data;

  try {
    const user = await UserModel.createNewUser({
      email,
      password: await bcryptjs.hash(password, 10),
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    });

    return user;
  } catch (error) {
    if (
      error.name &&
      error.name === 'MongoServerError' &&
      error.code &&
      error.code === 11000
    ) {
      throw new BadRequest({
        description: 'Email has already been taken.',
        errorCode: 'ERRAUTH001',
        errorData: error.keyValue,
      });
    }

    throw error;
  }
};

const login = async (data) => {
  const { email, password } = data;

  const user = await UserModel.findUserByEmail(email);

  const incorrectError = new BadRequest({
    description: 'Incorrect email or password.',
    errorCode: 'ERRAUTH002',
  });

  if (user === null) throw incorrectError;

  const isPasswordMatched = await bcryptjs.compare(password, user.password);

  if (isPasswordMatched === false) throw incorrectError;

  return user;
};

module.exports = { register, login };
