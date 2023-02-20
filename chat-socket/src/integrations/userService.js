const axiosInstance = require('./axiosInstance');

const get = async (id) => {
  try {
    const req = await axiosInstance.get('/users', {
      params: {
        id,
      },
    });

    return req.data.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  get,
};
