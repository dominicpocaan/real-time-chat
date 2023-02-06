import styles from './ChatPage.module.scss';
import Inbox from './components/inbox/Inbox';
import Messages from './components/messages/Messages';

const ChatPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.inbox}>
        <div className={styles.title}>Chats</div>
        <Inbox />
      </div>
      <div className={styles.input}>
        <input />
      </div>
      <Messages />
    </div>
  );
};

export default ChatPage;
