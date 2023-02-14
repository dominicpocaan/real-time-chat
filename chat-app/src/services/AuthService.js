import axiosInstance from './axiosInstance';

export const login = async (data) => {
  return await axiosInstance.post('/auth/login', JSON.stringify(data), {
    withCredentials: true,
  });
};

export const status = async () => {
  return await axiosInstance.get('/auth/status', {
    withCredentials: true,
  });
};

export default {
  login,
  status,
};
