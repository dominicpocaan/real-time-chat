import { useEffect, useState } from 'react';
import { useAuthState } from '../../../../contexts/AuthContext';
import {
  useChatDispatch,
  useChatState,
} from '../../../../contexts/ChatContext';
import UserService from '../../../../services/UserService';
import styles from './Inbox.module.scss';

const Inbox = () => {
  const { user } = useAuthState();
  const { conversations } = useChatState();
  const { startConversation } = useChatDispatch();

  const [email, setEmail] = useState('');
  const [searching, setSearching] = useState(true);
  const [users, setUsers] = useState([]);

  const clearSearch = () => {
    setUsers([]);
    setSearching(true);
    setEmail('');
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (email) {
        UserService.getAll({ except: user.email, email: email })
          .then((result) => {
            setUsers(result.data.data);
            setSearching(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [email]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>Chats</div>
      <div className={styles.search}>
        <input
          value={email}
          placeholder="Search by email . . ."
          onChange={(e) => {
            setSearching(true);
            setEmail(e.target.value.trim());
          }}
          // onKeyDown={(e) => {
          //   if (e.key.toLowerCase() === 'enter' && email) {
          //   }
          // }}
        />
      </div>
      <div className={styles.inbox}>
        {email ? (
          <div className={styles.search}>
            {searching ? (
              'Searching . . .'
            ) : users.length > 0 ? (
              <div>
                {users.map((user, index) => (
                  <div
                    key={`search-result-${index}`}
                    className={styles['search-result']}
                    onClick={() => {
                      clearSearch();
                      startConversation(user._id, user.email);
                    }}
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            ) : (
              'No result'
            )}
          </div>
        ) : (
          conversations.map((value, index) => {
            const anotherUser = value.usersDetails.filter(
              (userDetail) => userDetail.id !== user.id
            )[0];

            return (
              <div
                key={`inbox-item-${index}`}
                className={styles['inbox-item']}
                onClick={() => {
                  startConversation(anotherUser.id, anotherUser.email);
                }}
              >
                <div>{anotherUser.email}</div>
                <div className={styles['recent-message']}>
                  {value.recentMessage
                    ? value.recentMessage.value ?? ''
                    : 'No messages yet . . .'}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Inbox;
