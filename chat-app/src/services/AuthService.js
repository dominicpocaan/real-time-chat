import axiosInstance from './axiosInstance';

const register = async (data) => {
  return axiosInstance.post('/auth/register', JSON.stringify(data), {
    withCredentials: true,
  });
};

const login = async (data) => {
  return axiosInstance.post('/auth/login', JSON.stringify(data), {
    withCredentials: true,
  });
};

const status = async () => {
  return axiosInstance.get('/auth/status', {
    withCredentials: true,
  });
};

export default {
  register,
  login,
  status,
};
