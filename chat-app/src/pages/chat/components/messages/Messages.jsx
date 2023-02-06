import styles from './Messages.module.scss';

const Messages = () => {
  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}></div>
        <div className={styles.name}>Username</div>
      </div>
      <hr style={{ border: '0.01em solid #686868' }} />
    </div>
  );
};

export default Messages;
