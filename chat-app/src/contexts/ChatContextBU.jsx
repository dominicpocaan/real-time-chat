import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const ChatStateContext = createContext();
export const ChatDispatchContext = createContext();

export const ChatProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const [conversations, setConversations] = useState([]);

  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

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
        setConversations(data);
      });

      socket.on('conversation:list:update', (data) => {
        setConversations([...conversations, data]);
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
    socket.emit('conversation:start', { id }, (res) => {
      setConversation(res);
    });
  };

  const sendMessage = (message) => {
    socket.emit('message:send', message);
    setMessages([...messages, { message }]);
  };

  const state = { messages, conversation, conversations };
  const dispatch = { connect, startConversation, sendMessage };

  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        {props.children}
      </ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  );
};

export const useChatState = () => useContext(ChatStateContext);
export const useChatDispatch = () => useContext(ChatDispatchContext);
