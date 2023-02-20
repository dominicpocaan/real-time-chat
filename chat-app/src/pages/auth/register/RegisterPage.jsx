import Input from '../../../components/input/Input';
import useRegister from '../../../hooks/useRegister';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const { validating, email, password, setEmail, setPassword, handleRegister } =
    useRegister();

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Input
          type="text"
          value={email}
          placeholder="Enter email address"
          label="EMAIL ADDRESS"
          onChange={(value) => setEmail(value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Enter password"
          label="ENTER PASSWORD"
          onChange={(value) => setPassword(value)}
        />
        <button
          disabled={validating}
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </button>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default RegisterPage;
