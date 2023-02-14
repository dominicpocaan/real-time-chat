import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../contexts/AuthContext';

const useLogin = () => {
  const navigate = useNavigate();

  const { login } = useAuthDispatch();

  const [validating, setValidating] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setValidating(true);

    try {
      await login({ email, password });

      navigate('/');
    } catch (error) {
      console.log(error);
    }

    setValidating(false);
  };

  return {
    validating,
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};

export default useLogin;
