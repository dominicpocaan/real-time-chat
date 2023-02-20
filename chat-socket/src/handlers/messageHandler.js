const messageHandler = (io, socket) => {
  const send = (data) => {
    console.log(socket.user);
    console.log(data);
  };

  socket.on('message:send', send);
};

module.exports = messageHandler;
