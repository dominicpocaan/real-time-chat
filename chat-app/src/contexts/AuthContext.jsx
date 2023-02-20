import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [authenticating, setAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.status()
      .then((result) => {
        if (result.data.status === 200) {
          setUser({
            id: result.data.data._id,
            email: result.data.data.email,
          });

          setAuthenticated(true);
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthenticating(false);
      });
  }, []);

  const register = async (data) => {
    const { email, password } = data;

    const result = await AuthService.register({ email, password });

    if (result.data.status === 200) {
      setAuthenticated(true);
    }

    return result;
  };

  const login = async (data) => {
    const { email, password } = data;

    const result = await AuthService.login({ email, password });

    if (result.data.status === 200) {
      setAuthenticated(true);
    }

    return result;
  };

  const logout = async () => {};

  const state = { user, authenticating, authenticated };
  const dispatch = { register, login, logout };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
