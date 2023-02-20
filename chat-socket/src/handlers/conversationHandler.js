const userService = require('../integrations/userService');
const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');

const conversationHandler = (io, socket) => {
  const start = async (data, res) => {
    const other = data.id;
    const current = socket.user;

    if (socket.currentRoom) {
      socket.leave(socket.currentRoom);
      socket.currentRoom = null;
    }

    const existingConversation = await ConversationModel.getByUsers([
      other,
      current,
    ]);

    if (existingConversation !== null) {
      const currentRoom = existingConversation._id.toString();

      socket.join(currentRoom);
      socket.currentRoom = currentRoom;

      const messages = await MessageModel.getByConversationId(currentRoom);

      res(existingConversation, messages);
    } else {
      const [otherUser, currentUser] = await Promise.all([
        userService.get(other),
        userService.get(current),
      ]);

      const conversation = await ConversationModel.insert({
        users: [other, current],
        usersDetails: [
          { id: otherUser._id, email: otherUser.email },
          { id: currentUser._id, email: currentUser.email },
        ],
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      });

      socket.join(conversation._id.toString());
      socket.currentRoom = conversation._id.toString();

      io.to(other).emit('conversation:list:update', conversation);
      io.to(current).emit('conversation:list:update', conversation);
    }
  };

  const get = async () => {
    const current = socket.user;

    socket.join(current);

    const conversations = await ConversationModel.getByUser(current);

    socket.emit('conversation:list', conversations);
  };

  socket.on('conversation:start', start);
  socket.on('conversation:get', get);
};

module.exports = conversationHandler;
