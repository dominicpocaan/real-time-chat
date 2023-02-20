import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = ({
  handleConversation,
  handleConversations,
  handleConversationsUpdate,
  handleMessages,
  handleMessagesUpdate,
}) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('[socket] connected');
        setConnected(true);

        socket.emit('conversation:get');
      });

      socket.on('disconnect', () => {
        console.log('[socket] diconnected');
        setConnected(false);
      });

      socket.on('connect_error', (error) => {
        console.log(error);
      });

      socket.on('conversation:list', (data) => {
        handleConversations(data);
      });

      socket.on('conversation:list:update', (data) => {
        handleConversationsUpdate(data);
      });

      socket.on('message:new', (data) => {
        handleMessagesUpdate(data);
      });
    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
      }
    };
  }, [socket]);

  const connect = () => {
    if (socket === null) {
      setSocket(io(import.meta.env.VITE_SOCKET, { withCredentials: true }));
    }
  };

  const startConversation = (id, email) => {
    socket.emit('conversation:start', { id }, (conversation, messages) => {
      handleConversation(conversation);
      handleMessages(messages);
    });
  };

  const sendMessage = (message) => {
    socket.emit('message:send', message);
  };

  return {
    connect,
    connected,
    startConversation,
    sendMessage,
  };
};

export default useSocket;
