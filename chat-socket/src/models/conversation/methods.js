class ConversationMethods {
  static async insert(data) {
    const result = await this.create(data);

    return result;
  }

  static async getByUser(data) {
    const result = await this.find({ users: data }).sort({ updatedAt: -1 });

    return result;
  }

  static async getByUsers(data) {
    const result = this.findOne({
      $and: [{ users: data[0] }, { users: data[1] }],
    });

    return result;
  }

  static async getByIdAndUpdate(data) {
    const { id, update } = data;

    const result = this.findByIdAndUpdate(id, update, {
      new: true,
    });

    return result;
  }
}

module.exports = ConversationMethods;
