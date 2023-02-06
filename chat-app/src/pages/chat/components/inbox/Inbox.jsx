import styles from './Inbox.module.scss';
// import InboxItem from './InboxItem';

const Inbox = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>Chats</div>
      <div className={styles.inbox}>
        {/* {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6,
          7, 8, 9, 10, 11, 12, 13, 14, 15,
        ].map((value) => {
          return <InboxItem key={`inbox-${value}`} />;
        })} */}
      </div>
    </div>
  );
};

export default Inbox;
