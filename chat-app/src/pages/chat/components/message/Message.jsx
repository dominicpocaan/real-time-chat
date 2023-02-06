import styles from './Message.module.scss';

const Message = (props) => {
  return (
    <div
      className={styles.root}
      style={{
        justifyContent: props.userIsSender === true ? 'right' : 'left',
      }}
    >
      <div
        style={{
          backgroundColor: props.userIsSender === true ? '#221f22' : '#ffffff',
          color: props.userIsSender === true ? '#ffffff' : '#221f22',
        }}
        className={styles.message}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Message;
