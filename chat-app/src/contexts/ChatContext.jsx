import { createContext, useContext, useState } from 'react';

export const ChatStateContext = createContext();
export const ChatDispatchContext = createContext();

export const ChatProvider = (props) => {
  const [messages, setMessages] = useState([{ message: 'Hi' }]);

  const sendMessage = (message) => {
    setMessages([...messages, { message }]);
  };

  const state = { messages };
  const dispatch = { sendMessage };

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
