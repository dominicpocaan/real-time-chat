import { useChatState } from '../../../../contexts/ChatContext';
import Message from '../message/Message';
import styles from './Messages.module.scss';

const Messages = () => {
  const { messages } = useChatState();

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}></div>
        <div className={styles.name}>Username</div>
      </div>
      <hr style={{ border: '0.01em solid #686868' }} />
      <div className={styles.transcript}>
        {messages.map((data, index) => {
          return (
            <Message key={`message-${index}`} userIsSender={false}>
              {data.message}
            </Message>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
