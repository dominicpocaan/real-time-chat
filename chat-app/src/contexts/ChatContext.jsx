import { createContext, useContext, useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { useAuthState } from './AuthContext';

export const ChatStateContext = createContext();
export const ChatDispatchContext = createContext();

export const ChatProvider = (props) => {
  const { authenticated } = useAuthState();

  const [conversations, setConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});

  const handleConversation = (data) => {
    setConversation(data);
  };

  const handleConversations = (data) => {
    setConversations((conversations) => {
      if (conversations.length === 0) return [...conversations, ...data];

      return conversations;
    });
  };

  const handleConversationsUpdate = (data) => {
    setConversations((conversations) => {
      const updated = [...conversations, data];

      return updated.sort((a, b) => {
        return a.updatedAt > b.updatedAt
          ? -1
          : a.updatedAt < b.updatedAt
          ? 1
          : 0;
      });
    });
  };

  const socket = useSocket({
    handleConversation,
    handleConversations,
    handleConversationsUpdate,
  });

  const startConversation = (id, email) => {
    socket.startConversation(id, email);
  };

  const sendMessage = (message) => {
    socket.sendMessage(message);
    setMessages([...messages, { message }]);
  };

  useEffect(() => {
    if (authenticated && !socket.connected) {
      socket.connect();
    }
  }, [authenticated]);

  const state = { messages, conversation, conversations };
  const dispatch = {
    startConversation,
    sendMessage,
  };

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
