class MessageMethods {
  static async insert(data) {
    const result = await this.create(data);

    return result;
  }

  static async getByConversationId(data) {
    const result = await this.find({ conversationId: data }).sort({
      sentAt: 1,
    });

    return result;
  }
}

module.exports = MessageMethods;
