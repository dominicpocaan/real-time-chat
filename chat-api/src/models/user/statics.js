async function createNewUser(user) {
  const result = await this.create(user);

  return result;
}

async function findUserByEmail(email) {
  const result = await this.findOne({ email: email });

  return result;
}

module.exports = {
  createNewUser,
  findUserByEmail,
};
