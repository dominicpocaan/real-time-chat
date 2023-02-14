import Input from '../../../components/input/Input';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Input
          type="text"
          value=""
          placeholder="Enter email address"
          label="EMAIL ADDRESS"
        />
        <Input
          type="text"
          value=""
          placeholder="Enter password"
          label="ENTER PASSWORD"
        />
        <button>Register</button>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default RegisterPage;
