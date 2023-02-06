import { useState } from 'react';
import { useChatDispatch } from '../../contexts/ChatContext';
import styles from './ChatPage.module.scss';
import Inbox from './components/inbox/Inbox';
import Messages from './components/messages/Messages';

const ChatPage = () => {
  const { sendMessage } = useChatDispatch();

  const [message, setMessage] = useState('');

  return (
    <div className={styles.root}>
      <Inbox />
      <Messages />
      <div className={styles.input}>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              setMessage('');
              sendMessage(message);
            }
          }}
        />
        <button
          onClick={() => {
            setMessage('');
            sendMessage(message);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
