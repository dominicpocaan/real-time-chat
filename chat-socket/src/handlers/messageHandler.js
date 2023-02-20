const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');

const messageHandler = (io, socket) => {
  const send = async (data) => {
    if (socket.currentRoom) {
      const sentAt = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

      const message = await MessageModel.insert({
        conversationId: socket.currentRoom,
        message: data.message,
        sentAt: sentAt,
        sentBy: socket.user,
      });

      const conversation = await ConversationModel.getByIdAndUpdate({
        id: socket.currentRoom,
        update: {
          recentMessage: {
            value: data.message,
            sentAt: sentAt,
            sentBy: socket.user,
          },
          updatedAt: sentAt,
        },
      });

      for (const user of conversation.users) {
        io.to(user).emit('conversation:list:update', conversation);
      }

      socket.broadcast.to(socket.currentRoom).emit('message:new', message);
    } else {
      // Get conversation ID from data,
      // then validate if user have conversation access.
    }
  };

  socket.on('message:send', send);
};

module.exports = messageHandler;
