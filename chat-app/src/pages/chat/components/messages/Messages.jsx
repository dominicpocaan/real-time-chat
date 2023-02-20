import { useEffect, useRef, useState } from 'react';
import { useAuthState } from '../../../../contexts/AuthContext';
import { useChatState } from '../../../../contexts/ChatContext';
import Message from '../message/Message';
import styles from './Messages.module.scss';

const Messages = () => {
  const { user } = useAuthState();
  const { messages, conversation } = useChatState();

  const [firstLoad, setFirstLoad] = useState(true);
  const [conversationId, setConversationId] = useState('');

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  const messagesViewRef = useRef();

  const [scrolling, setScrolling] = useState(false);

  const onScroll = () => {
    if (messagesViewRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesViewRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setScrolling(false);
      } else {
        setScrolling(true);
      }
    }
  };

  useEffect(() => {
    if (
      (firstLoad && messages.length > 0) ||
      conversation._id !== conversationId
    ) {
      scrollToBottom();
      setFirstLoad(false);
      setConversationId(conversation._id);
    } else if (!scrolling) {
      scrollToBottom();
    }
  }, [messages, conversation]);

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
      <div
        className={styles.transcript}
        onScroll={() => onScroll()}
        ref={messagesViewRef}
      >
        {messages.map((data, index) => {
          return (
            <Message
              key={`message-${index}`}
              userIsSender={data.sentBy === user.id}
            >
              {data.message}
            </Message>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
