import styles from './Input.module.scss';

const Input = (props) => {
  return (
    <div className={styles.root}>
      <label>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onClick={() => {
          if (props.onClick) {
            props.onClick();
          }
        }}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e.target.value);
          }
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
