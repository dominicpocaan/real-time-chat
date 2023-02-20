import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../contexts/AuthContext';

const useRegister = () => {
  const navigate = useNavigate();

  const { register } = useAuthDispatch();

  const [validating, setValidating] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    setValidating(true);

    try {
      await register({ email, password });

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
    handleRegister,
  };
};

export default useRegister;
