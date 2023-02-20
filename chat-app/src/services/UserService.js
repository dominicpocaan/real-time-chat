import axiosInstance from './axiosInstance';

const getAll = async (data) => {
  const { except, email } = data;

  return axiosInstance.get('/users/list', {
    withCredentials: true,
    params: {
      except,
      email,
    },
  });
};

export default {
  getAll,
};
