class UserMethods {
  static async insert(data) {
    const result = await this.create(data);

    return result;
  }

  static async getById(id) {
    const result = await this.findById(id, 'email');

    return result;
  }

  static async getByEmail(email) {
    const result = await this.findOne({ email: email });

    return result;
  }

  static async getAll(data) {
    const { except, email } = data;

    const result = await this.find(
      {
        $and: [
          { email: { $regex: email, $options: 'i' } },
          { email: { $not: { $eq: except } } },
        ],
      },
      'email'
    );

    return result;
  }
}

module.exports = UserMethods;
