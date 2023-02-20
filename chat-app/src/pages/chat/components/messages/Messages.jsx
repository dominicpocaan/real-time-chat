import { useAuthState } from '../../../../contexts/AuthContext';
import { useChatState } from '../../../../contexts/ChatContext';
import Message from '../message/Message';
import styles from './Messages.module.scss';

const Messages = () => {
  const { user } = useAuthState();
  const { messages, conversation } = useChatState();

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        {conversation.usersDetails ? (
          <div className={styles.avatar}></div>
        ) : (
          <></>
        )}
        <div className={styles.name}>
          {conversation.usersDetails
            ? conversation.usersDetails.filter(
                (userDetail) => userDetail.id !== user.id
              )[0].email
            : ''}
        </div>
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
