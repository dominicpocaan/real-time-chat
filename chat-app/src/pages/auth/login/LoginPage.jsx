import Input from '../../../components/input/Input';
import useLogin from '../../../hooks/useLogin';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const { validating, email, password, setEmail, setPassword, handleLogin } =
    useLogin();

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
        <button disabled={validating} onClick={handleLogin}>
          Login
        </button>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginPage;
