import { createContext, useContext, useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { useAuthState } from './AuthContext';

export const ChatStateContext = createContext();
export const ChatDispatchContext = createContext();

export const ChatProvider = (props) => {
  const { user, authenticated } = useAuthState();

  const [conversations, setConversations] = useState([]);

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});

  const handleConversation = (data) => {
    setConversation(data);
  };

  const handleConversations = (data) => {
    setConversations((currConversations) => {
      if (currConversations.length === 0)
        return [...currConversations, ...data];

      return currConversations;
    });
  };

  const handleConversationsUpdate = (data) => {
    setConversations((currConversations) => {
      const indexOfUpdate = currConversations.findIndex(
        (conversation) => conversation._id === data._id
      );

      let updated = [];

      if (indexOfUpdate >= 0) {
        currConversations[indexOfUpdate].recentMessage = data.recentMessage;
        currConversations[indexOfUpdate].updatedAt = data.updatedAt;

        updated = [...currConversations];
      } else {
        updated = [...currConversations, data];
      }

      return updated.sort((a, b) => {
        return a.updatedAt > b.updatedAt
          ? -1
          : a.updatedAt < b.updatedAt
          ? 1
          : 0;
      });
    });
  };

  const handleMessages = (data) => {
    setMessages(data);
  };

  const handleMessagesUpdate = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const socket = useSocket({
    handleConversation,
    handleConversations,
    handleConversationsUpdate,
    handleMessages,
    handleMessagesUpdate,
  });

  const startConversation = (id, email) => {
    socket.startConversation(id, email);
  };

  const sendMessage = (message) => {
    if (conversation._id)
      socket.sendMessage({ conversationId: conversation._id, message });

    setMessages([...messages, { message, sentBy: user.id }]);
  };

  useEffect(() => {
    if (authenticated && !socket.connected) socket.connect();
  }, [authenticated]);

  const state = { messages, conversation, conversations };
  const dispatch = { startConversation, sendMessage };

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
